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
                    newDivTitle.addClass("title content-section");
                    newDivTitle.text(i.title + " ");
                    newDivTitle.attr("data-id", i.id);
                    newDivTitle.attr("data-method", "GET");
                    name.append(newDivTitle);

                    var elementA = $("<a>");
                    elementA.addClass("deleteBook btn btn-outline-info float-right");
                    elementA.text("delete");
                    elementA.attr("href", "#");
                    elementA.attr("data-method", "DELETE");
                    newDivTitle.append(elementA);

                    var newDiv = $("<div>");
                    newDiv.addClass("titleDiv px-2");
                    newDivTitle.append(newDiv);
                    newDiv.hide();

                    var newUl = $("<ul>");
                    newDiv.append(newUl);

                    var modifyA = $("<a>");
                    modifyA.addClass("modifyBook btn btn-outline-info");
                    modifyA.text("modify");
                    modifyA.attr("href", "#");
                    modifyA.attr("data-id", i.id);
                    newDiv.append(modifyA);
                }

                var titles = $(".title");
                titles.on("click", function () {
                    var divThis = $(this).children();
                    var ulThis = divThis.children("ul");
                    divThis.fadeIn();
                    var url = "http://localhost:8000/book/" + $(this).data("id");
                    if (ulThis.children().length === 0) {
                        oneAjax(url, {}, $(this).data("method"), "popSpecifics", ulThis);
                    }
                });

                var links = $(".deleteBook");
                links.on("click", function (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    var bookDiv = $(this).parent();
                    var url = "http://localhost:8000/book/" + bookDiv.data("id");
                    oneAjax(url, {}, $(this).data("method"), "reload");
                })

            } else if (func === "popSpecifics") {
                var1.append($("<li>" + result.author + "</li>"));
                var1.append($("<li>" + result.publisher + "</li>"));
                var1.append($("<li>" + result.isbn + "</li>"));
                var1.append($("<li>" + result.genre + "</li>"));
                var1.siblings("a").on("click", function (event) {
                    event.preventDefault();
                    var newForm = $(".form_hidden").clone(true);
                    newForm.css("display", "block");
                    $(this).parent().append(newForm);
                    $(this).hide();
                    var idform = "submit_PUT_" + $(this).closest(".title").data("id")
                    $(this).siblings(".form_hidden").find("button").attr("id", idform);
                    $("#" + idform).on("click", function (event) {
                        var form = $(this).closest("form");
                        var idBook = form.siblings(".modifyBook").data("id");
                        var author = form.find(".id_author_PUT").val();
                        var title = form.find(".id_title_PUT").val();
                        var isbn = form.find(".id_isbn_PUT").val();
                        var publisher = form.find(".id_publisher_PUT").val();
                        var genre = form.find(".id_genre_PUT").val();
                        var formData = {
                            author: author,
                            title: title,
                            isbn: isbn,
                            publisher: publisher,
                            genre: genre
                        };
                        var url = "http://localhost:8000/book/" + idBook;
                        oneAjax(url, formData, $(this).data("method"), "reload");
    });
                    })
            } else if (func === "reload") {
                location.reload()
            }

        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        });
    };

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
        oneAjax("http://localhost:8000/book/", formData, $(this).data("method"), "reload");
    });

    // populate main
    oneAjax("http://localhost:8000/book/", {}, "GET", "populate");

});