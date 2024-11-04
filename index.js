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
            // cl("menuChính", menuChính);
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
                            class: "menuItem cpi fwb c0",
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
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (item) {
                          return $("<div>", {
                            dataIndex: item,
                            class: "asideItem bsbb fdsf bra50i wh30 cpi",
                          });
                        })
                      )
                    ),
                    // footer
                    $("<footer>", {
                      class:
                        "w1-100 pf b0 r0 z5 df aic jcfe bgct h60 pr35 fs2 fs1-xs ttu fwb",
                    }).append(
                      $("<div>", {
                        class: "pa fs09 b0 l0 tac w1 df aic jcc ttx wfc",
                        text: "Lướt xuống...",
                        style:
                          "animation: float 2s ease-in-out infinite;color: #C3423F",
                      }).append(
                        $("<i>", {
                          class: "fa-solid fa-arrow-turn-down",
                          style: "color: #C3423F",
                        })
                      ),
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
                    // home
                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic o0 tpo td5 ttfe bgpc bgsc",
                      style: "background-image: url(imgs/bg-paper.png)",
                    }).append(
                      $("<div>", {
                        class: "w50 h1v pa t0 bgpc bgsc",
                        style:
                          "background: rgba(18, 18, 18, 0.92); background-image: url(imgs/trongDongBg.png);",
                      }),
                      $("<div>", {
                        class: "pb31 bgso bgpc bgrn pa t0 l0 z0 w25 tt-50",
                        style:
                          "background-image:url(imgs/trongDongGold.png);  left: 20%",
                      }),
                      $("<div>", {
                        class: "pb31 bgso bgpc bgrn pa b0 r0 z0 w25 ttx05",
                        style: "background-image:url(imgs/trongDongBlack.png)",
                      }),
                      $("<div>", { class: "container" }).append(
                        $("<div>", {
                          class: "w1 df jcsb",
                        }).xửLý(
                          "đốiTượng.tải.bàiViết",
                          {
                            d: {
                              thuộcTính: {
                                ụ: ["16900", "~|"],
                              },
                              giớiHạn: 6,
                              sắpXếp: "ấ-",
                            },
                          },
                          function (a) {
                            var t = $(this);
                            //   a: Danh sách id bài viết
                            CẦN.db("bàiViết." + a, function () {
                              t.empty().append(
                                $("<div>", { class: "w40" }).append(
                                  $("<div>", {
                                    text: dữLiệu.tên(161038, "ế"),
                                    class: "pr z1 lh1 z3 fwb",
                                    style: "color: #C3423F; font-size: 94px",
                                  }),
                                  $("<div>", {
                                    text: dữLiệu.môTả(161038, "ế"),
                                    class: "fs15 pr w50 z1 lh12 mt25",
                                    style: "color: #EEE4DA",
                                  })
                                ),
                                $("<div>", {
                                  class: "w10 lh12 fsi fwb",
                                  text: "Cần Kiệm Liêm Chính Chí Công Vô Tư",
                                  style: "color: #C3423F; font-size: 55px",
                                }),
                                $("<div>", {
                                  class:
                                    "pb31 bgsc bgpc bgrn bóng pa tt t50 l50 w25 z1",
                                }).ảnh(a[0] || 161038, "ế", true)
                              );
                            });
                          }
                        )
                      )
                    ),

                    // introduce

                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic o0 tpo td5 ttfe bgpc bgsc",
                      style: "background-image: url(imgs/bg-paper.png)",
                    }).append(
                      $("<div>", {
                        class: "pb31 bgso bgpc bgrn pa t0 l0 z0 w25 tt-50",
                        style:
                          "background-image:url(imgs/trongDongGold.png);  left: 20%",
                      }),
                      $("<div>", {
                        class: "pb31 bgso bgpc bgrn pa b0 r0 z0 w25 ttx05",
                        style: "background-image:url(imgs/trongDongBlack.png)",
                      }),
                      $("<div>", { class: "container pr z1" }).xửLý(
                        "đốiTượng.tải.bàiViết",
                        {
                          d: {
                            thuộcTính: {
                              ụ: ["16901", "~|"],
                            },
                            giớiHạn: 20,
                            sắpXếp: "ấ-",
                          },
                        },
                        function (a) {
                          var t = $(this);
                          CẦN.db("bàiViết." + a, function () {
                            t.empty().append(
                              $("<div>", {
                                text: dữLiệu.tên(161040, "ế"),
                                class: "lh1 fwb",
                                style: "color: #C3423F; font-size: 85px",
                              }),
                              $("<div>", {
                                html: config("bàiViết.161040.ộ"),
                                class: "fs2 lh16 mt25 c0",
                              })
                            );
                          });
                        }
                      )
                    ),

                    // time line
                    $("<section>", {
                      class:
                        "section wh1v t0 l0 r0 b0 pf df aic o0 tpo td5 ttfe bgpc bgsc",
                      style: "background-image: url(imgs/trongDongBg.png)",
                    }).append(
                      $("<div>", {
                        class: "pb31 bgso bgpc bgrn pa t0 l0 z0 w25 tt-50",
                        style:
                          "background-image:url(imgs/trongDongBlack.png);  left: 20%",
                      }),
                      $("<div>", {
                        class: "pb31 bgso bgpc bgrn pa b0 r0 z0 w25 ttx05",
                        style: "background-image:url(imgs/trongDongGold.png)",
                      }),
                      $("<div>", { class: "container pr z1" }).xửLý(
                        "đốiTượng.tải.bàiViết",
                        {
                          d: {
                            thuộcTính: {
                              ụ: ["16903", "~|"],
                            },
                            giớiHạn: 20,
                            sắpXếp: "ấ-",
                          },
                        },
                        function (a) {
                          var t = $(this);
                          CẦN.db("bàiViết." + a, function () {
                            t.empty().append(
                              $("<div>", {
                                text: "Dòng thời gian lịch sử Việt Nam",
                                class: "lh1 fwb",
                                style: "color: #C3423F; font-size: 85px",
                              }),

                              $("<div>", { class: "xinChao" }).sờLais(
                                a.map(function (á) {
                                  var ê = dữLiệu.tên(á, "ế");
                                  return bốCục.thẻ(á, {
                                    // bookmark:true,
                                    // dọc:false,
                                    ê: ê,
                                    môTả: dữLiệu.môTả(á, "ế"),
                                    bo: "col-sm-4,col-md-3",
                                    bọc: "bs20d",
                                    lớp: "-pa15,plr15",
                                    xong: function () {
                                      $(this)
                                        .find(".gốc")
                                        .sửaLớp("tac,ttu,mb10");
                                    },
                                  });
                                }),
                                {
                                  // ê:'',
                                  sửaLớp: {
                                    tên: "ml15,pl15,pr,vt,",
                                    chứaSờLai: "plr0",
                                    sờLai: "pt15",
                                    khốiSờLai: "-pt15,pb10",
                                  },
                                  tựChạy: 12000,
                                  xong: function () {},
                                }
                              )
                            );
                          });
                        }
                      )
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
            var menuItems = $(".menuItem");
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
              if (index === 2) {
                menuItems.css({ color: "#EEE4DA" });
              } else {
                menuItems.css("color", "");
              }
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
                switch (item.text) {
                  case "Home":
                    currentSection = 0;
                    break;
                  case "PRECIS":
                    currentSection = 1;
                    break;
                  case "HISTORY":
                    currentSection = 3;
                    break;
                  default:
                }

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
