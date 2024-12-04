using System.Reflection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(c =>
    c.AllowAnyHeader()
     .AllowAnyMethod()
     .AllowAnyOrigin());

string storageRoot = "./bookStorage.json";
List<Book> books=new();

if(File.Exists(storageRoot))
{
    var json = File.ReadAllText(storageRoot);
    books.AddRange(JsonSerializer.Deserialize<List<Book>>(json));
}

app.MapGet("/books", () =>
{
    return Results.Ok(books);
});

app.MapPost("/books", (Book book) =>
{
    books.Add(book); 
     var json = JsonSerializer.Serialize(books);
    File.WriteAllText(storageRoot, json);
});

app.MapPut("/books/{id}", (string id, CheckOutBody body ) =>
{
    var book = books.FirstOrDefault(b => b.Id == id);

    book = book with { CheckedBy = body.CheckedBy, CheckedTime = body.CheckedTime};
    books = books.Select(b => b.Id == id ? book : b).ToList();
    var json = JsonSerializer.Serialize(books, new JsonSerializerOptions
    {
        WriteIndented = true
    });
    File.WriteAllText(storageRoot, json);

    return Results.Ok(book);
});

app.Run();

public record Book( string? Id, string Title, string Author, string Description, string Cover,  String? CheckedBy, String CheckedTime);
public record CheckOutBody(String? CheckedBy, String CheckedTime ); 