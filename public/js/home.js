$(document).ready(function () {
    const variants = [
      {
        id: "one",
        textColor: "#000",
        bgColor: "#fff",
        productImgPath: "./images/nike1",
        logoImgPath: "./images/logo2.png",
        buttonColor: "#fff",
      },
      {
        id: "two",
        textColor: "#000",
        bgColor: "coral",
        productImgPath: "./images/nike2",
        logoImgPath: "./images/logo2.png",
        buttonColor: "#fff",
      },
      {
        id: "three",
        textColor: "#fff",
        bgColor: "#000",
        productImgPath: "./images/nike3",
        logoImgPath: "./images/logo1.png",
        buttonColor: "#000",
      },
    ];
    variants.forEach((variant) => {
      $(`.${variant.id}`).on("click", function () {
        $("body").css({ color: variant.textColor, background: variant.bgColor });
        $(".product-img").attr("src", `${variant.productImgPath}/1.png`);
        $(".logo-img img").attr("src", variant.logoImgPath);
        $(".btn").css({ color: variant.buttonColor, background: "#000" });
        $(".variant").removeClass("active");
        $(this).addClass("active");
        $(".images").html("");
        for (let i = 1; i <= 6; i++) {
          $(".images").append(`<img src='${variant.productImgPath}/${i}.png'/>`);
        }
      });
    });
  });
  