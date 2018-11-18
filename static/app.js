$(function () {
    $.ajax({
        url: "http://localhost:8000/book/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function (result) {
        var name = $("#name");
        for (var i of result) {
            var newDivTitle = $("<div>");
            newDivTitle.addClass("title article-title content-section");
            newDivTitle.text(i.title + " ");
            newDivTitle.attr("data-id", i.id);
            name.append(newDivTitle);

            var elementA = $("<a>");
            elementA.addClass("deleteBook");
            elementA.text("delete");
            elementA.attr("href", "#");
            newDivTitle.append(elementA);

            var newDiv = $("<div>");
            newDiv.addClass("titleDiv article-content px-2");
            newDivTitle.append(newDiv);
            newDiv.hide();

            var newUl = $("<ul>");
            newDiv.append(newUl);

        }
        var titles = $(".title");
        titles.on("click", function () {
            var divThis = $(this).children();
            var ulThis = divThis.children();
            divThis.fadeIn();
            $.ajax({
                url: "http://localhost:8000/book/" + $(this).data("id"),
                data: {},
                type: "GET",
                dataType: "json"
            }).done(function (result) {
                if (ulThis.children().length === 0) {
                    ulThis.append($("<li>" + result.author + "</li>"));
                    ulThis.append($("<li>" + result.isbn + "</li>"));
                    ulThis.append($("<li>" + result.publisher + "</li>"));
                    ulThis.append($("<li>" + result.genre + "</li>"));
                }

            }).fail(function (xhr, status, err) {
            }).always(function (xhr, status) {
            });
        });
        var links = $(".deleteBook");
        links.on("click", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            var bookDiv = $(this).parent();
            $.ajax({
                url: "http://localhost:8000/book/" + bookDiv.data("id"),
                data: {},
                type: "DELETE",
                dataType: "json"
            }).done(function (result) {
                location.reload()
            }).fail(function (xhr, status, err) {
            }).always(function (xhr, status) {
            });

        })
    }).fail(function (xhr, status, err) {
    }).always(function (xhr, status) {
    });


    $("#submit").on("click", function (event) {

        var author = $("#id_author").val();
        var title = $("#id_title").val();
        var isbn = $("#id_isbn").val();
        var publisher = $("#id_publisher").val();
        var genre = $("#id_genre").val();

        $.ajax({
            url: "http://localhost:8000/book/",
            //url: "https://swapi.co/api/people/",
            data: {
                author: author,
                title: title,
                isbn: isbn,
                publisher: publisher,
                genre: genre
            },
            type: "POST",
            dataType: "json"
        }).done(function (result) {
        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        });
    })
});