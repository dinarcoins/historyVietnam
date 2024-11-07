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
          var ụTổng = data.ụTổng;
          CẦN.db(["chuyênMục." + ụTổng, "chuyênLực." + ụTổng], function () {
            tánGẫu.khởiTạo(true, {
              tàiKhoản: [
                { ê: "nguyễn văn a", à: "143585", ô: "zz", i: "app::cod" },
                // {}
              ],
              chào: "xin chào",
            });
            var menuChính = config("chuyênLực." + ụTổng), // chuyên Lực sẽ chỉ lấy các chuyên mục cấp con ngay sau nó
              thân,
              banner;
            // cl("menuChính", menuChính);
            var getImgIds = function (str) {
              // hàm lấy all id ảnh bài viết
              var ids = $(str)
                .find("img")
                .map(function () {
                  return this.id;
                })
                .get();
              return ids;
            };
            var trangChủ = function () {
              $(".wrapper")
                .empty()
                .append(
                  $("<div>", { class: "container-fluid" }).append(
                    // header fixed
                    $("<header>", {
                      class:
                        "w1-md-80 w1-md pf t0 r0 z5 df aic jcsb h60 pl10 fs1 ttu",
                      style: " background-color: #C3423F",
                    }).append(
                      $("<div>", {
                        class:
                          "bra50i bgpc bgsc bra50i wh32 backToMenu cpi dn-lg",
                        style: "background-image: url('imgs/logoAside.png')",
                      }),
                      $("<div>", { class: "cpi dn-lg mr25" })
                        .append($("<i>", { class: "fa-solid fa-bars fs2" }))
                        .click(function () {
                          var navMenu = $(".menu");
                          navMenu.sửaLớp("+r0");
                        }),
                      $("<nav>", {
                        class: "df aic jcsb fs13p fwb gap50 dn-lg- w1",
                      }).append(
                        !empty(menuChính) &&
                          menuChính.map(function (id) {
                            return $("<a>", {
                              class: `menuItem cpi fwb`,
                              text: dữLiệu.tên(id, "ụ"),
                              style: "color: #EEE4DA",
                              href: dữLiệu.url(id, "ụ"),
                            });
                          }),
                        $("<div>", { class: "" }).append(
                          bốCục.ôTìmKiếm(menuChính, {
                            // i: 1 hoặc 1 mảng ID chuyên mục cần tìm kiếm. Hệ thống sẽ tìm kiếm bài viết trong chuyên mục i và các chuyên mục con của i
                            giớiHạn: 20, // Số lượng bài viết
                            p: 1, // Chỉ tìm kiếm các bài viết công khai
                            e: dịch("Tìm thời kỳ"), // Placeholder ô nhập từ khóa
                            bo: "-bar,-bg1,-z11,-col-xs-22,-col-sm-6,-col-lg-5", // Sửa lớp thẻ bo ngoài
                            ẩn: false, // TRUE: Ẩn sẵn ô tìm kiếm. Mặc định: TRUE
                            treo: false, // TRUE: Thêm thuộc tính position:absolute. Mặc định: TRUE
                            đóng: false, // TRUE: Cho phép click bên ngoài để tắt. Mặc định: TRUE
                            // bỏQua: "", // Nếu cho phép click bên ngoài để đóng danh sách sau tìm kiếm → Bỏ qua sự kiện click vào các bộ chọn được thiết lập (Class, ID, Attr, v.v..)
                            // sửaLớp: {
                            //   cụcSearch: "-plr10",
                            //   sDiĐộng: "ml5,pa5,cf,bg1,-cl1",
                            //   ôTìmkiếm: "-bn,b1sd",
                            //   "bgcf.bss": "-bgcf,-bss,-bcd,-bw1",
                            // },
                            xong: function () {},
                          })
                        )
                      ),
                      // menu mobile
                      $("<nav>", {
                        class:
                          "df fdc plr25 pt25 pb25 tpa ttfe td5 aib w1 fs13p fwb gap50 menu dn-lg pa t0 r-1 bs01b bgcf ",
                      }).append(
                        $("<div>", { class: "closeMenu cpi dn-lg db" })
                          .append($("<i>", { class: "fa-solid fa-x fs2" }))
                          .click(function () {
                            var navMenu = $(".menu");
                            navMenu.sửaLớp("-r0");
                          }),
                        !empty(menuChính) &&
                          menuChính.map(function (id) {
                            return $("<a>", {
                              class: "menuNavItem bct bbw1 bss cpi",
                              text: dữLiệu.tên(id, "ụ"),
                              href: dữLiệu.url(id, "ụ"),
                            });
                          }),
                        $("<div>", { class: "" }).append(
                          bốCục.ôTìmKiếm(menuChính, {
                            // i: 1 hoặc 1 mảng ID chuyên mục cần tìm kiếm. Hệ thống sẽ tìm kiếm bài viết trong chuyên mục i và các chuyên mục con của i
                            giớiHạn: 20, // Số lượng bài viết
                            p: 1, // Chỉ tìm kiếm các bài viết công khai
                            e: dịch("Tìm thời kỳ"), // Placeholder ô nhập từ khóa
                            bo: "-bar,-bg1,-z11,-col-xs-22,-col-sm-6,-col-lg-5", // Sửa lớp thẻ bo ngoài
                            ẩn: false, // TRUE: Ẩn sẵn ô tìm kiếm. Mặc định: TRUE
                            treo: false, // TRUE: Thêm thuộc tính position:absolute. Mặc định: TRUE
                            đóng: false, // TRUE: Cho phép click bên ngoài để tắt. Mặc định: TRUE
                            // bỏQua: "", // Nếu cho phép click bên ngoài để đóng danh sách sau tìm kiếm → Bỏ qua sự kiện click vào các bộ chọn được thiết lập (Class, ID, Attr, v.v..)
                            // sửaLớp: {
                            //   cụcSearch: "-plr10",
                            //   sDiĐộng: "ml5,pa5,cf,bg1,-cl1",
                            //   ôTìmkiếm: "-bn,b1sd",
                            //   "bgcf.bss": "-bgcf,-bss,-bcd,-bw1",
                            // },
                            xong: function () {},
                          })
                        )
                      )
                    ),
                    // aside fixed

                    $("<aside>", {
                      class: "pf h1v t0 l0 w80p z5 df aic jcc bgcf1 dn-md-",
                    }).append(
                      $("<div>", {
                        class:
                          "bra50i bgpc bgsc pa t5 l50 tt bra50i wh64 backToMenu cpi",
                        style: "background-image: url('imgs/logoAside.png')",
                      }).tip("Lên trang đầu"),
                      $("<div>", {
                        class: "pr df fdc aic",
                        style: "gap: 20px",
                      }).append(
                        [0, 1, 2].map(function (item) {
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
                        "w1-md-80 dn-lg- pf b0 r0 z5 df aic jcfe bgct h40 pr35 fs1 ttu fwb",
                    }).append(
                      $("<div>", {
                        class:
                          "scrollDownBtn pa fs1 b0 l0 tac w1 df aic jcc ttx wfc cpi",
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
                        text: "i&e - Vietnam",
                        class: `mr25 fs1 ls03`,
                        style: `color: #C3423F`,
                      }).tip("Thuộc quyền của I&E")
                    ),
                    // Trang chủ
                    (thân = $("<div>", {
                      class: "bgpc bgsc",
                      style: "background-image: url(imgs/bg-paper.png)",
                    })
                      .empty()
                      .append(
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
                            style:
                              "background-image:url(imgs/trongDongBlack.png)",
                          }),
                          $("<div>", { class: "container plr25" }).append(
                            $("<div>", {
                              class: "w1 df jcsb fww",
                            }).xửLý(
                              "đốiTượng.tải.bàiViết",
                              {
                                d: {
                                  thuộcTính: {
                                    ụ: ["16899", "~|"],
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
                                    $("<div>", {
                                      class: "col-xs-6",
                                    }).append(
                                      $("<div>", {
                                        text: dữLiệu.tên(161587, "ế"),
                                        class: "pr z1 lh1 z3 fwb fs1-md",
                                        style:
                                          "color: #C3423F; font-size: 80px;",
                                      }),
                                      $("<div>", {
                                        text: dữLiệu.môTả(161587, "ế", 1000),
                                        class:
                                          "fs15 fs09-md pr col-xs-12 z1 lh12 mt25 taj pr25",
                                        style: "color: #EEE4DA",
                                      })
                                    ),
                                    $("<div>", {
                                      class: " col-xs-6 df",
                                    }).append(
                                      $("<div>", {
                                        class: "bgsc bgpc bgrn h1 bóng w10",
                                        style:
                                          "background-image: url(imgs/chuTichHoChiMinh1945.png)",
                                      }),
                                      $("<div>", {
                                        class: "bgsc bgpc bgrn h1 bóng w10",
                                        style:
                                          "background-image: url(imgs/ngoQuyen.png)",
                                      }),
                                      $("<div>", {
                                        class: "bgsc bgpc bgrn h1 bóng w10",
                                        style:
                                          "background-image: url(imgs/dinhDocLap.png)",
                                      }),
                                      $("<div>", {
                                        class: "bgsc bgpc bgrn h1 bóng w10",
                                        style:
                                          "background-image: url(imgs/dienBienPhu.png)",
                                      }),
                                      $("<div>", {
                                        class: "bgsc bgpc bgrn h1 bóng w10",
                                        style:
                                          "background-image: url(imgs/haiBaTrung.png)",
                                      }),
                                      $("<div>", {
                                        class: "bgsc bgpc bgrn h1 bóng w10",
                                        style:
                                          "background-image: url(imgs/baTrieu.png)",
                                      }),
                                      $("<div>", {
                                        class: "bgsc bgpc bgrn h1 bóng w10",
                                        style:
                                          "background-image: url(imgs/quangTruongBaDinh.png)",
                                      })
                                    )
                                  );
                                });
                              }
                            )
                          )
                        ),

                        // trước 1855
                        $("<section>", {
                          class:
                            "section wh1v t0 l0 r0 b0 pf df aic o0 tpo td5 ttfe bgpc bgsc",
                          style: "background-image: url(imgs/trongDongBg.png)",
                        }).append(
                          $("<div>", {
                            class: "pb31 bgso bgpc bgrn pa t0 l0 z0 w25 tt-50",
                            style:
                              "background-image:url(imgs/trongDongGold.png);  left: 20%",
                          }),
                          $("<div>", {
                            class: "pb31 bgso bgpc bgrn pa b0 r0 z0 w25 ttx05",
                            style:
                              "background-image:url(imgs/trongDongBlack.png)",
                          }),
                          $("<div>", { class: "container pr z1" }).xửLý(
                            "đốiTượng.tải.bàiViết",
                            {
                              d: {
                                thuộcTính: {
                                  ụ: ["16901", "~|"],
                                },
                                giớiHạn: 20,
                                sắpXếp: "ấ+",
                              },
                            },
                            function (a) {
                              var t = $(this);
                              CẦN.db("bàiViết." + a, function () {
                                t.empty().append(
                                  $("<div>", {
                                    text: dữLiệu.tên(16901, "ụ"),
                                    class: "lh12 fwb fs4 fs1-xs fs2-md mb25",
                                    style: "color: #EEE4DA",
                                  }),
                                  $("<div>", {
                                    text: dữLiệu.môTả(16901, "ụ"),
                                    class: "lh1 fwb fs1",
                                    style: "color: #EEE4DA;",
                                  }),

                                  $("<div>", { class: "xinChao" }).sờLais(
                                    a.map(function (i) {
                                      return $("<div>", {
                                        class: "col-xs-12 col-sm-4 mt25",
                                      })
                                        .append(
                                          $("<a>", {
                                            class: "plr25 db cpi crdh",
                                          }).append(
                                            $("<div>", {
                                              class:
                                                "w1 pb169 bgsc bgrn bra10 bóng",
                                            }).ảnh(i, "ế", true),
                                            $("<div>", {
                                              class: "mtb15 fs1 wbox fwb",
                                              rows: "1",
                                              text: dữLiệu.tên(i, "ế"),
                                              style: "color: #EEE4DA",
                                            }),
                                            $("<div>", {
                                              class: "wbox mb15 fs1",
                                              rows: "2",
                                              text: dữLiệu.môTả(i, "ế"),
                                              style: "color: #EEE4DA",
                                            }),
                                            $("<div>", {
                                              class: "df aic",
                                              style: "color: #EEE4DA",
                                            }).append(
                                              $.icon("schedule::O fs1 mr5"),
                                              $("<div>", {
                                                class: "",
                                                text: "Xem thêm..",
                                              })
                                            )
                                          )
                                        )
                                        .click(function () {
                                          khung(
                                            $("<div>", {
                                              class: " plr25 ptb25",
                                              style:
                                                "background-image: url(imgs/bg-paper.png)",
                                            }).append(bốCục.bàiViết(i)),
                                            "__khung",
                                            {
                                              tiêuĐề: dữLiệu.tên(i, "ế"),
                                              ngoài: "",
                                              trong: "col-xs-12,col-md-8",
                                              koTắt: false,
                                            }
                                          );
                                        });
                                    }),
                                    {
                                      // ê: $("<a>", {
                                      //   class: "fwb ttu",
                                      //   text: dữLiệu.tên(16901, "ụ"),
                                      //   href: dữLiệu.url(16901, "ụ"),
                                      // }),
                                      sửaLớp: {
                                        tên: "ml15,pl15,pr,vt,cf",
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

                        // sau 1855
                        $("<section>", {
                          class:
                            "section wh1v t0 l0 r0 b0 pf df aic o0 tpo td5 ttfe bgpc bgsc",
                          style: "background-image: url(imgs/bg-paper.png)",
                        }).append(
                          $("<div>", {
                            class: "pb31 bgso bgpc bgrn pa t0 l0 z0 w25 tt-50",
                            style:
                              "background-image:url(imgs/trongDongBlack.png);  left: 20%",
                          }),
                          $("<div>", {
                            class: "pb31 bgso bgpc bgrn pa b0 r0 z0 w25 ttx05",
                            style:
                              "background-image:url(imgs/trongDongGold.png)",
                          }),
                          $("<div>", { class: "container pr z1" }).xửLý(
                            "đốiTượng.tải.bàiViết",
                            {
                              d: {
                                thuộcTính: {
                                  ụ: ["16908", "~|"],
                                },
                                giớiHạn: 20,
                                sắpXếp: "ấ+",
                              },
                            },
                            function (a) {
                              var t = $(this);
                              CẦN.db("bàiViết." + a, function () {
                                t.empty().append(
                                  $("<div>", {
                                    text: dữLiệu.tên(16908, "ụ"),
                                    class: "lh12 fwb fs4 fs1-xs fs2-md mb25 c0",
                                  }),
                                  $("<div>", {
                                    text: dữLiệu.môTả(16908, "ụ"),
                                    class: "lh1 fwb fs1 c0",
                                  }),

                                  $("<div>", { class: "xinChao" }).sờLais(
                                    a.map(function (i) {
                                      return $("<div>", {
                                        class: "col-xs-12 col-sm-4 mt25",
                                      })
                                        .append(
                                          $("<a>", {
                                            class: "plr25 db cpi crdh",
                                          }).append(
                                            $("<div>", {
                                              class:
                                                "w1 pb169 bgsc bgrn bra10 bóng",
                                            }).ảnh(i, "ế", true),
                                            $("<div>", {
                                              class: "mtb15 fs1 wbox fwb",
                                              rows: "1",
                                              text: dữLiệu.tên(i, "ế"),
                                            }),
                                            $("<div>", {
                                              class: "wbox mb15 fs1",
                                              rows: "2",
                                              text: dữLiệu.môTả(i, "ế"),
                                            }),
                                            $("<div>", {
                                              class: "df aic",
                                            }).append(
                                              $.icon("schedule::O fs1 mr5"),
                                              $("<div>", {
                                                class: "",
                                                text: "Xem thêm..",
                                              })
                                            )
                                          )
                                        )
                                        .click(function () {
                                          khung(
                                            $("<div>", {
                                              class: " plr25 ptb25",
                                              style:
                                                "background-image: url(imgs/bg-paper.png)",
                                            }).append(bốCục.bàiViết(i)),
                                            "__khung",
                                            {
                                              tiêuĐề: dữLiệu.tên(i, "ế"),
                                              ngoài: "",
                                              trong: "col-xs-12,col-md-8",
                                              koTắt: false,
                                            }
                                          );
                                        });
                                    }),
                                    {
                                      // ê: $("<a>", {
                                      //   class: "fwb ttu",
                                      //   text: dữLiệu.tên(16901, "ụ"),
                                      //   href: dữLiệu.url(16901, "ụ"),
                                      // }),
                                      sửaLớp: {
                                        tên: "ml15,pl15,pr,vt,cf",
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
                        )
                      ))
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
            var scrollDownBtn = $(".scrollDownBtn");
            var backToMenuBtn = $(".backToMenu");
            var btn_toTop = $(".btn_toTOp");

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
              }, 1500);
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

            $(scrollDownBtn).on("click", function () {
              currentSection++;
              if (currentSection >= navItems.length) {
                return;
              }
              return showSection(currentSection);
            });

            $(backToMenuBtn).on("click", function () {
              currentSection = 0;
              return showSection(currentSection);
            });

            $(window).on("wheel", handleScroll);
            handleTouch();

            showSection(currentSection);

            $.each(
              {
                xửLý: "https://cdn.inevn.com/xửLý",
                0: function () {
                  trangChủ;
                },
                c: function (i) {
                  // Code giao diện chuyên mục tại
                  cl(
                    "tổng",
                    khôngGian.chuyênMục.sau(ụTổng) +
                      khôngGian.chuyênMục.trước(i)
                  );
                  cl("sau", khôngGian.chuyênMục.sau(ụTổng));
                  cl("trước", khôngGian.chuyênMục.trước(i));
                  thân.empty().append(
                    $("<div>", {
                      class: "container pr pt60",
                    }).append(
                      $("<div>", {
                        class: "pb31 bgso bgpc bgrn pa b0 r0 z1 w25 ttx05",
                        style: "background-image:url(imgs/trongDongBlack.png)",
                      }),
                      $("<button>", {
                        class:
                          "pf wh50 bra50 bss bcrd bw3 o05 o1h cpi bgcf df aic jcsc crdh btn_toTOp",
                        style: "bottom:80px;right:30px",
                      })
                        .append(
                          $("<i>", { class: "fa-solid fa-arrow-up fs16" })
                        )
                        .click(function () {
                          cl("hello2");
                          $(window).scrollTop(0);
                        }),
                      $("<div>", { class: "mt25 mb40 plr15-xs z1 pr" }).append(
                        // tạo thanh điều hướng mở theo từng cấp

                        bốCục.vụnBánh(i, {
                          ọ: "ụ", // Loại đối tượng xem (Chuyên mục → "ụ", Bài viết → "ế")
                          // menuPhụ: ".menuConChuyênMục",
                          làmMới: true,
                          bo: "gạchChânDòng",
                          idCache: "cache",
                          tải: true,
                          ụ: ụTổng, // ID chuyên mục tổng (Chuyên mục chứa tất cả chuyên mục website)
                        }),

                        $("<div>", { class: "" }),

                        $("<div>", { class: "df fww jcsb" }).xửLý(
                          "đốiTượng.tải.bàiViết",
                          {
                            d: {
                              thuộcTính: { p: "1", ụ: [i, "~|"] },
                              sắpXếp: "ấ+",
                            },
                          },
                          { cache: true, onCached: true, delay: 1000 },
                          function (s) {
                            // console.log("LLLllllllllllllllllllllllllll", s);
                            // s: Danh sách bài viết liên quan đến chuyên mục
                            (t = $(this)), (ả = s || []);
                            // Có nhiều bài viết liên quan
                            CẦN.db("bàiViết." + ả, function () {
                              t.empty().append(
                                $("<div>", {
                                  class: "pr df fdc col-md-9 col-xs-12",
                                }).append(
                                  $("<div>", {
                                    class: "pa t0 b0 l50 ttx",
                                    style:
                                      "width: 4px; background-color: #C3423F",
                                  }),
                                  ả.map(function (á) {
                                    return $("<div>", {
                                      class:
                                        "pr df fdrr jcsa aic timeline-item mt50",
                                    }).append(
                                      $("<div>", {
                                        class:
                                          "col-xs-5 bgsc bgpc bgrn pb51 bra15 hoverImage tpa td5 ttfe bấmĐc",
                                      })
                                        .ảnh(á, "ế", true)
                                        .click(function () {
                                          var id = getImgIds(
                                            config("bàiViết." + á + ".ộ")
                                          );
                                          quảnTrị.xemẢnh(id);
                                        })
                                        .nétẢnh(),
                                      $("<div>", {
                                        class: "col-xs-5 bgcf bóng pa10 bra15",
                                      }).append(
                                        $("<a>", {
                                          class:
                                            "fwb crdh tduh fs16 fs1-lg lh12",
                                          text: dữLiệu.tên(á, "ế"),
                                          href: dữLiệu.url(á, "ế"),
                                        }),
                                        $("<div>", {
                                          class: "mt10",
                                          text: dữLiệu.môTả(á, "ế", 150),
                                        }),
                                        $("<div>", {
                                          class: "mt25 df jcfe aic",
                                        }).append(
                                          $.icon("schedule:: fs16 fs09-md mr5"),
                                          $("<div>", {
                                            class: "",
                                            text: iDate(
                                              config("bàiViết." + á + ".ấ"),
                                              "DD/MM/YYYY"
                                            ),
                                          })
                                        )
                                      )
                                    );
                                  })
                                ),
                                $("<div>", {
                                  class: "col-xs-3  df fdc pl25 dn-md-",
                                }).append(
                                  $("<div>", {
                                    class: "fs16 fs1-md c0 fwb mb25",
                                    text: "Các mục thời gian:",
                                  }),
                                  ả.map(function (á) {
                                    return $("<a>", {
                                      class:
                                        "hoverTicket tpa td2 ttfe fwb crdh tduh c0 fs1 fs09-md pr lh12 bấmĐc pa10 mb25 brtl30 brbl30 itemssss",
                                      text: dữLiệu.tên(á, "ế"),
                                      href: dữLiệu.url(á, "ế"),
                                      style:
                                        "color: #EEE4DA; background-color: #C3423F ",
                                    }).append(
                                      $("<div>", {
                                        class: "w20p pa r0 t1",
                                        style:
                                          "background: #C3423F ; background-image: linear-gradient(rgba(0, 0, 0, 0.2) 100%, transparent);clip-path: polygon(0 0, 100% 0, 0 100%); aspect-ratio: 1;",
                                      })
                                    );
                                  }),
                                  $("<div>", {
                                    class: "fs16 fs1-md c0 fwb mb25",
                                    text: "Các mục thời gian khác:",
                                  })
                                )
                              );
                            });
                          }
                        )
                      )
                    )
                  );
                },
                a: function (i) {
                  // Code giao diện xem bài viết tại
                  thân.empty().append(
                    $("<div>", { class: "container pt60" }).append(
                      $("<div>", { class: "mt25 mb40 plr15-xs" }).append(
                        $("<div>", { class: "mtb25" }).append(
                          bốCục.vụnBánh(i, {
                            // i là ID đối tượng xem
                            ọ: "ế", // Loại đối tượng xem (Chuyên mục → "ụ", Bài viết → "ế")
                            menuPhụ: "", // Bộ chọn menu phụ (Nếu có)
                            làmMới: true,
                            bo: "gạchChânDòng",
                            idCache: "cache",
                            tải: true,
                            menuPhụ: ".menuConChuyênMục",
                            ụ: ụTổng, // ID chuyên mục tổng (Chuyên mục chứa tất cả chuyên mục website)
                          })
                        ),
                        $("<div>", { class: "mtb25" }).append(
                          $("<div>", {
                            class: "w50 pb41 bgsc bgrn bra10 bóng",
                          })
                            .ảnh(i, "ế", true)
                            .click(function () {
                              var id = getImgIds(config("bàiViết." + i + ".ộ"));
                              quảnTrị.xemẢnh(id);
                            }),
                          $("<div>", {
                            class: "mtb25 crd fwb fs2",
                            text: dữLiệu.tên(i, "ế"),
                          }),
                          $("<div>", { class: "df jcsb" }).append(
                            $("<div>", { class: "df" }).append(
                              $.icon("print:: fs16 mr5"),
                              $("<div>", {
                                class: "",
                                text: "In bài viết",
                              })
                            ),

                            $("<div>", { class: "df" }).append(
                              $.icon("schedule:: fs16 mr5"),
                              $("<div>", {
                                class: "",
                                text: iDate(
                                  config("bàiViết." + i + ".ấ"),
                                  "DD/MM/YYYY"
                                ),
                              })
                            )
                          )
                        ),
                        $("<div>", {
                          class: "w1 mlra bgcf pa15 fs1",
                          html: config("bàiViết." + i + ".ộ"),
                        })
                      )
                    )
                  );
                },
                404: function () {
                  vàoURL("/");
                },
              },
              function (á, à) {
                config("url." + á, à);
                cl("aaaaaaaaaaa", á, "aaaa", à);
              }
            );
          });
          vàoURL();
        }
      );
    },
  });
});
