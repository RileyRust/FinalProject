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

app.MapGet("/books", () => books);
app.MapPost("/books", (Book book) =>
{
    books.Add(book); 
     var json = JsonSerializer.Serialize(books);
    File.WriteAllText(storageRoot, json);
});
app.Run();

public record Book(String? Id, string Title, string Author, string Description);
