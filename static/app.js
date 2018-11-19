$(function () {

    var oneAjax = function (url, data, type, func, var1) {
        $.ajax({
            url: url,
            data: data,
            type: type,
            dataType: "json",
            // async: false
        }).done(function (result) {
            if (func === "populate") {
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
                    var url = "http://localhost:8000/book/" + $(this).data("id");
                    if (ulThis.children().length === 0) {
                        oneAjax(url, {}, "GET", "popSpecifics", ulThis);
                    }
                });

                var links = $(".deleteBook");
                links.on("click", function (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    var bookDiv = $(this).parent();
                    var url = "http://localhost:8000/book/" + bookDiv.data("id");
                    oneAjax(url, {}, "DELETE", "deleteBook");

                })

            } else if (func === "popSpecifics") {
                var1.append($("<li>" + result.author + "</li>"));
                var1.append($("<li>" + result.isbn + "</li>"));
                var1.append($("<li>" + result.publisher + "</li>"));
                var1.append($("<li>" + result.genre + "</li>"));
            } else if (func === "deleteBook") {
                location.reload()
            } else if (func === "postForm") {
                location.reload()
            }

        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        });
    };

    // populate main
    oneAjax("http://localhost:8000/book/", {}, "GET", "populate");

    $("#submit").on("click", function (event) {
        var author = $("#id_author").val();
        var title = $("#id_title").val();
        var isbn = $("#id_isbn").val();
        var publisher = $("#id_publisher").val();
        var genre = $("#id_genre").val();
        var formData = {
            author: author,
            title: title,
            isbn: isbn,
            publisher: publisher,
            genre: genre
        };
        oneAjax("http://localhost:8000/book/", formData, "POST", "postForm");
    })
});