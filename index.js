var chưaCóCache = true,
  data = {
    ụTổng: 16899, // ID chuyên mục tổng của website
    //   tinTiêuĐiểm: 5027, // ID tin tiêu điểm
    linkKhác: {
      // Đổi url theo id đường dẫn
      0: "/",
    },
    tênKhác: {
      // Đổi tên hiển thị theo id đường dẫn
      0: "Trang chủ",
    },
    ụHỏiĐáp: [], // MẢng chứa id sử dụng giao diện gửi câu hỏi
  };

var footerText = [
  { text: "V", color: "bgc0" },
  { text: "i", color: "bgcr" },
  { text: "e", color: "bgc0" },
  { text: "t", color: "bgcr" },
  { text: "n", color: "bgc0" },
  { text: "a", color: "bgcr" },
  { text: "m", color: "bgc0" },
];

$(function () {
  tảiTrước({
    dữLiệu: {
      // Sử dụng package riêng
      js: ["package.all"],
      css: ["package.all"],
    },
    biểuTượng: "imgs/bieuTuong.png",
    chờ: 2000, //tạo độ trễ khi vào xem nội dung (đảm bảo nội dung render đầy đủ)
    koChe: false, //không hiển thị
    màuNền: "#C3423F", //Màu nền chờ
    riêng: true, //tải theo thư viện khác
    cache: true, //Tải cache các file package
    trước: function () {
      // Gán cache,v.v....
    },

    xong: function () {
      // Viết code giao diện hiển thị

      CẦN.js(
        [
          "https://thuctap.inevn.com/nguyendinhhuy/js/function.min.js",
          "https://thuctap.ine.vn/nguyendinhhuy/js/include.core.min.js",
          "https://thuctap.inevn.com/nguyendinhhuy/CauHinhWeb/js/include.min.js?=123",
        ],
        true,
        function () {
          ụTổng = data.ụTổng;
          CẦN.db(["chuyênMục." + ụTổng, "chuyênLực." + ụTổng], function () {
            var menuChính = config("chuyênLực." + ụTổng), // chuyên Lực sẽ chỉ lấy các chuyên mục cấp con ngay sau nó
              thân,
              banner;
            cl("menuChính", menuChính);
            var trangChủ = function () {
              $(".wrapper")
                .empty()
                .append(
                  $("<div>", { class: "container-fluid" }).append(
                    // header fixed
                    $("<header>", {
                      class:
                        "w1-100 pf t0 r0 z5 df aic c0 jcfe bgct h60 pr35 fs2 fs1-xs ttu",
                      style: "gap: 50px",
                    }).append(
                      !empty(menuChính) &&
                        menuChính.map(function (id) {
                          return $("<a>", {
                            class: "menuItem cpi",
                            text: dữLiệu.tên(id, "ụ"),
                          });
                        })
                    ),
                    // aside fixed

                    $("<aside>", {
                      class: "pf h1v t0 l0 w100 z5 df aic jcc bgcf1",
                    }).append(
                      $("<div>", {
                        class: "bra50i bgpc bgsc pa t5 l50 tt bra50i",
                        style: "background-image: url('imgs/logoAside.png')",
                      }),
                      $("<div>", {
                        class: "pr df fdc aic",
                        style: "gap: 20px",
                      }).append(
                        $("<div>", {
                          dataIndex: 0,
                          class: "asideItem bsbb fdsf bra50i wh30 cpi",
                        }),
                        $("<div>", {
                          dataIndex: 1,
                          class: "asideItem bsbb fdsf bra50i wh30 cpi",
                        }),
                        $("<div>", {
                          dataIndex: 2,
                          class: "asideItem bsbb fdsf bra50i wh30 cpi",
                        }),
                        $("<div>", {
                          dataIndex: 3,
                          class: "asideItem bsbb fdsf bra50i wh30 cpi",
                        })
                      )
                    ),
                    // footer
                    $("<footer>", {
                      class:
                        "w1-100 pf b0 r0 z5 df aic jcfe bgct h60 pr35 fs2 fs1-xs ttu fwb",
                    }).append(
                      $("<div>", {
                        class: "wh8 bra50i mr25",
                        style: "background: #C3423F",
                      }),
                      footerText.map(function (item, index) {
                        return $("<div>", {
                          text: item.text,
                          class: `mr25`,
                          style: `${index % 2 === 0 && "color: #C3423F"}`,
                        });
                      }),
                      $("<div>", {
                        class: "wh8 bra50i",
                        style: "background: #C3423F",
                      })
                    ),
                    // body
                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic jcc o0 tpo td5 ttfe bgpc bgsc",
                      style: "background-image: url(imgs/bg-paper.png)",
                    }).append(
                      $("<div>", {
                        class: "w50 h1v pa t0 l0 bgpc bgsc",
                        style: "background: rgba(18, 18, 18, 0.92); background-image: url(imgs/trongDongBg.png);"
                      })
                    ),

                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic jcc o0 tpo td5 ttfe",
                    }),
                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic jcc o0 tpo td5 ttfe",
                    }),
                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic jcc o0 tpo td5 ttfe",
                    }),
                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic jcc o0 tpo td5 ttfe",
                    }),
                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic jcc o0 tpo td5 ttfe",
                    })
                  )
                );
            };
            trangChủ();

            // var header = $(".header");

            var currentSection = 0;
            var sections = $(".section");
            var navItems = $(".asideItem");
            var totalSections = sections.length;
            var isScrolling = false;

            function showSection(index) {
              sections.each((idx, section) => {
                if (idx === index) {
                  $(section).css({ opacity: 1, zIndex: 1 });
                } else {
                  $(section).css({ opacity: 0, zIndex: 0 });
                }
              });

              navItems.each((idx, item) => {
                if (idx === index) {
                  $(item)
                    .css({
                      backgroundColor: "#fff",
                      border: "10px solid #C3423F",
                    })
                    .addClass("wh30");
                } else {
                  $(item)
                    .css({ backgroundColor: "#808080A3", border: "none" })
                    .addClass("wh20")
                    .removeClass("wh30");
                }
              });
            }

            function handleScroll(event) {
              if (isScrolling) {
                return;
              }
              if (
                event.originalEvent.deltaY > 0 &&
                currentSection < totalSections - 1
              ) {
                isScrolling = true;
                currentSection++;
              } else if (event.originalEvent.deltaY < 0 && currentSection > 0) {
                isScrolling = true;
                currentSection--;
              }

              if (currentSection >= navItems.length) {
                isScrolling = false;
                return;
              }

              showSection(currentSection);

              setTimeout(() => {
                isScrolling = false;
              }, 600);
            }
            //
            function handleTouch() {
              let startY = 0;

              $(window).on("touchstart", function (e) {
                startY = e.touches[0].clientY;
              });

              $(window).on("touchend", function (e) {
                const endY = e.changedTouches[0].clientY;
                if (isScrolling) {
                  return;
                }

                cl("currentSection", currentSection);

                if (startY > endY + 50 && currentSection < totalSections - 1) {
                  isScrolling = true;
                  currentSection++;
                } else if (startY < endY - 50 && currentSection > 0) {
                  isScrolling = true;
                  currentSection--;
                }

                showSection(currentSection);

                setTimeout(() => {
                  isScrolling = false;
                }, 3000);
              });
            }
            // click navItem sẽ tới section tương ứng
            navItems.each((index, item) => {
              $(item).on("click", function () {
                currentSection = index;
                showSection(currentSection);
              });
            });

            $(".menuItem").each((index, item) => {
              $(item).on("click", function () {
                currentSection = index;
                showSection(currentSection);
              });
            });

            $(window).on("wheel", handleScroll, cl("scroll"));
            handleTouch();

            showSection(currentSection);

            $.each(
              {
                // xửLý: "https://cdn.inevn.com/xửLý",
                "TT05-IE": function () {
                  trangChủ;
                },
                c: function (i, x, y, z) {
                  // Code giao diện chuyên mục tại
                  // đây;
                },
                a: function (i) {
                  // Code giao diện xem bài viết tại
                  // đây;
                },
              },
              function (á, à) {}
            );
          });
          vàoURL();
        }
      );
    },
  });
});
