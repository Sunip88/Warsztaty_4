$(function () {
    $.ajax({
        url: "http://localhost:8000/book/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function (result) {
        var name = $("#name");
        for (var i of result) {
            // var newP = $("<p class='title'>" + i.title + "</p>");
            var newP = $("<p>");
            var newDiv = $("<div class='titleDiv'>aaa</div>");
            newP.addClass("title");
            newP.text(i.title);
            newP.attr("data-id", i.id);
            name.append(newP);
            name.append(newDiv);
        }
        $(".titleDiv").hide();
        var titles = $(".title");
        titles.on("click", function () {
            var p = $(this);
            console.log($(this));
            $(this).next(".titleDiv").show();
            $.ajax({
                url: "http://localhost:8000/book/" + $(this).data("id"),
                //url: "https://swapi.co/api/people/",
                data: {},
                type: "GET",
                dataType: "json"
            }).done(function (result) {
                console.log(result);
                p.next().text(result.author)
            }).fail(function (xhr, status, err) {
            }).always(function (xhr, status) {
            });
        });
    }).fail(function (xhr, status, err) {
    }).always(function (xhr, status) {
    });

    $("input:submit").on("click", function (event) {

        var author = $("#author").val();
        var title = $("#title").val();
        var isbn = $("#isbn").val();
        var publisher = $("#publisher").val();
        var genre = $("#genre").val();

        // var newBook = {
        //     author: author,
        //     title: title,
        //     isbn: isbn,
        //     publisher: publisher,
        //     genre: genre
        // };
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