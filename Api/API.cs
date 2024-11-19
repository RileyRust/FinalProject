using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(c =>
    c.AllowAnyHeader()
     .AllowAnyMethod()
     .AllowAnyOrigin());

var storageRoot = "./bookStorage";
if (!Directory.Exists(storageRoot))
{
    Directory.CreateDirectory(storageRoot);
}


app.MapGet("/books", () =>
{
    var books = Directory.GetDirectories(storageRoot)
        .Select(bookDir =>
        {
            var bookFile = Path.Combine(bookDir, "book.json");
            if (!File.Exists(bookFile)) return null;

            var bookContent = File.ReadAllText(bookFile);
            return JsonSerializer.Deserialize<Book>(bookContent);
        })
        .Where(book => book != null);

    return books;
});


app.MapGet("/books/{id}", (ulong id) =>
{
    var bookPath = Path.Combine(storageRoot, id.ToString(), "book.json");

    if (!File.Exists(bookPath))
        return Results.NotFound($"Book with ID {id} not found.");

    var bookContent = File.ReadAllText(bookPath);
    var book = JsonSerializer.Deserialize<Book>(bookContent);

    return Results.Ok(book);
});

app.MapPost("/books", async (Book book) =>
{
    var bookPath = Path.Combine(storageRoot, book.Id.ToString());
    if (Directory.Exists(bookPath))
        return Results.Conflict($"A book with ID {book.Id} already exists.");

    Directory.CreateDirectory(bookPath);
    var bookFile = Path.Combine(bookPath, "book.json");

    await File.WriteAllTextAsync(bookFile, JsonSerializer.Serialize(book));
    return Results.Created($"/books/{book.Id}", book);
});

app.MapPut("/books/{id}", async (ulong id, Book updatedBook) =>
{
    var bookPath = Path.Combine(storageRoot, id.ToString(), "book.json");

    if (!File.Exists(bookPath))
        return Results.NotFound($"Book with ID {id} not found.");

    var newBook = updatedBook with { Id = id };
    await File.WriteAllTextAsync(bookPath, JsonSerializer.Serialize(newBook));

    return Results.Ok(newBook);
});


app.MapDelete("/books/{id}", (ulong id) =>
{
    var bookPath = Path.Combine(storageRoot, id.ToString());
    if (!Directory.Exists(bookPath))
        return Results.NotFound($"Book with ID {id} not found.");

    Directory.Delete(bookPath, true);
    return Results.Ok($"Book with ID {id} deleted.");
});

app.Run();

public record Book(ulong Id, string Title, string Author, string PrintCompany);
