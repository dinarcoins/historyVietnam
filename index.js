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
      0: "TrangChu",
    },
    ụHỏiĐáp: [], // MẢng chứa id sử dụng giao diện gửi câu hỏi
  };

$(function () {
  tảiTrước({
    dữLiệu: {
      // Sử dụng package riêng
      js: ["package.all"],
      css: ["package.all"],
    },
    biểuTượng: "/imgs/bieuTuong.png",
    chờ: 2500, //tạo độ trễ khi vào xem nội dung (đảm bảo nội dung render đầy đủ)
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

          CẦN.db(["chuyênMục." + ụTổng], function () {
            var menuChính = config("chuyênLực." + ụTổng), // chuyên Lực sẽ chỉ lấy các chuyên mục cấp con ngay sau nó
              thân,
              aside,
              header,
              footer,
              banner;
            CẦN.db(["chuyênMục." + menuChính], function () {
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
              $(".wrapper")
                .empty()
                .append(
                  (header = $("<div>", { class: "", id: "#header" })),
                  (thân = $("<div>", {
                    class: "hmnv h1",
                    id: "#body",
                    style: "background-image: url(/imgs/trongDongBg.png)",
                  })),
                  (footer = $("<div>", { class: "", id: "#footer" }))
                );
              header.empty().append(
                $("<div>", {
                  class: "w1 pf t0 r0 z5 df aic jcsb h60 plr15 fs1 ttu",
                  style: " background-color: #C3423F",
                }).append(
                  $("<a>", {
                    class: "bra50i bgpc bgsc bra50i wh32 backToMenu bấmĐc mr15",
                    style: "background-image: url('/imgs/logoAside.png')",
                    href: "/",
                  }).tip("Trở về trang chủ!"),
                  $("<div>", { class: "cpi dn-lg mr25" })
                    .append($("<i>", { class: "fa-solid fa-bars fs2" }))
                    .click(function () {
                      var navMenu = $(".menu");
                      navMenu.sửaLớp("+r0");
                    }),
                  // menu desktop
                  $("<nav>", {
                    class: "df aic jcsb fs13p fwb gap50 dn-lg- w1",
                  }).append(
                    !empty(menuChính) &&
                      menuChính.map(function (id) {
                        return $("<a>", {
                          class: `bấmĐc fwb tduh`,
                          text: dữLiệu.tên(id, "ụ"),
                          style: "color: #EEE4DA",
                          href: dữLiệu.url(id, "ụ"),
                        });
                      }),
                    $("<div>", {
                      class: "tar df aic jcfe pr khốiTìmKiếm col-xs-3",
                    }).append(
                      $("<div>", { id: "search", class: "w1" }).append(
                        $("<div>", { class: "df aic bra5 bgcf" }).append(
                          $("<input>", {
                            class: "bra3 pa5 ôTìmkiếm w1 bn on",
                            placeholder: "Tìm kiếm",
                            type: "text",
                          }),
                          $.icon("search::bra3,tac,fsn,cl1,fs14,bấmĐc,mr5")
                        )
                      )
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
                          class: "bấmĐc",
                          text: dữLiệu.tên(id, "ụ"),
                          href: dữLiệu.url(id, "ụ"),
                        });
                      }),
                    $("<div>", { class: "w1" }).append(
                      bốCục.ôTìmKiếm(menuChính, {
                        // i: 1 hoặc 1 mảng ID chuyên mục cần tìm kiếm. Hệ thống sẽ tìm kiếm bài viết trong chuyên mục i và các chuyên mục con của i
                        giớiHạn: 20, // Số lượng bài viết
                        p: 1, // Chỉ tìm kiếm các bài viết công khai
                        e: "Tìm thời kỳ", // Placeholder ô nhập từ khóa
                        bo: "-bar,-bg1,-z11,-col-xs-22,-col-sm-6,-col-lg-5", // Sửa lớp thẻ bo ngoài
                        ẩn: false, // TRUE: Ẩn sẵn ô tìm kiếm. Mặc định: TRUE
                        // tạo option bấm close khi cần đóng ô tìm kiếm
                        treo: false, // TRUE: Thêm thuộc tính position:absolute. Mặc định: TRUE
                        đóng: false, // TRUE: Cho phép click bên ngoài để tắt. Mặc định: TRUE
                        bỏQua: "", // Nếu cho phép click bên ngoài để đóng danh sách sau tìm kiếm → Bỏ qua sự kiện click vào các bộ chọn được thiết lập (Class, ID, Attr, v.v..)
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
                )
              );

              footer.empty().append(
                $("<div>", {
                  class:
                    "w1-md-80 dn-lg- pf b0 r0 z5 df aic jcfe bgct h40 pr35 fs1 ttu fwb",
                }).append(
                  $("<div>", {
                    class:
                      "scrollDownBtn pa fs1 b0 l0 tac w1 df aic jcc ttx wfc cpi",
                    text: "Cuộn xuống...",
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
                )
              );

              // Trang chủ
              var TrangChu = function () {
                thân.empty().append(
                  $("<div>", {
                    class: "bgpc bgsc",
                    style: "background-image: url(/imgs/bg-paper.png)",
                  })
                    .empty()
                    .append(
                      $("<div>", {
                        class: "pt180 pb25 tpo td5 ttfe bgpc bgsc",
                        style: "background-image: url(/imgs/bg-paper.png)",
                      }).append(
                        $("<div>", {
                          class: "pb31 bgso bgpc bgrn pa t0 l0 z0 w25 tt-50",
                          style:
                            "background-image:url(/imgs/trongDongBlack.png); left: 20%",
                        }),

                        $("<div>", { class: "container plr25" }).append(
                          $("<div>", {
                            class: "w1 df jcsa fww",
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
                                    text: dữLiệu.tên(161587, "ế"),
                                    class:
                                      "pr z1 lh15 z3 fwb fs5 fs16-md  col-xs-12 col-md-3 tal ttc",
                                    style: "color: #C3423F;",
                                  }),
                                  $("<div>", {
                                    class:
                                      "bgsc bgpc bgrn h1 bóng col-xs-12 col-md-4 pr z1 anhBacHo",
                                    style:
                                      "background-image: url(/imgs/bacHo.png)",
                                  }).append(
                                    $("<div>", {
                                      class: "wh128 pa b0 l0 bra50i z0 dn-md-",
                                      style:
                                        "background-color: #C3423F; transform: translate(-50%, 50%)",
                                    })
                                  ),

                                  $("<div>", {
                                    text: dữLiệu.môTả(161587, "ế", 500),
                                    class:
                                      "fs15 fs14-md fs11-sm pr col-xs-12 col-md-3 z1 lh12 mt25 taj",
                                    style: "color: #C3423F",
                                  }).append(
                                    $("<a>", {
                                      class: "bấmĐc fs1 db c0",
                                      text: "Xem thêm",
                                      href: dữLiệu.url("161587", "ế"),
                                    })
                                  )
                                );
                              });
                            }
                          )
                        )
                      ),

                      // trước 1855
                      $("<div>", {
                        class:
                          " pt180 pt25-xs tpo td5 ttfe bgpc bgsc pl0-sm pl100",
                        style: "background-image: url(/imgs/trongDongBg.png);",
                      }).append(
                        $("<div>", { class: "container pr z1" }).xửLý(
                          "đốiTượng.tải.chuyênMục",
                          {
                            d: {
                              thuộcTính: {
                                ụ: ["16901", "~|"],
                                p: "1",
                              },
                              giớiHạn: 20,
                              sắpXếp: "ấ+",
                            },
                          },
                          function (a) {
                            var t = $(this);
                            CẦN.db("chuyênMục." + a, function () {
                              t.empty().append(
                                $("<a>", {
                                  text: dữLiệu.tên(16901, "ụ"),
                                  class:
                                    "lh12 fwb fs4 fs16-md mb25 bấmĐc tduh db plr25 taj",
                                  style: "color: #EEE4DA",
                                  href: dữLiệu.url(16901, "ụ"),
                                }),
                                $("<div>", {
                                  text: dữLiệu.môTả(16901, "ụ"),
                                  class: "lh1 fs1-xs fs16 mt15 plr25 taj",
                                  style: "color: #EEE4DA;",
                                }),

                                $("<div>", { class: "xinChao" }).sờLais(
                                  a.map(function (i) {
                                    return $("<div>", {
                                      class: "col-xs-12 col-sm-4 mt25",
                                    }).append(
                                      $("<a>", {
                                        class: "plr25 db cpi crdh",
                                        href: dữLiệu.url(i, "ụ"),
                                      })
                                        .tip(
                                          "Xem tất cả bài viết trong chuyên mục"
                                        )
                                        .append(
                                          $("<div>", {
                                            class:
                                              "w1 pb169 bgsc bgrn bra10 bóng",
                                          }).ảnh(i, "ụ", true),
                                          $("<div>", {
                                            class: "mtb15 fs1-xs fs16 tduh fwb",
                                            rows: "1",
                                            text: dữLiệu.tên(i, "ụ"),
                                            style: "color: #EEE4DA",
                                          }),
                                          $("<div>", {
                                            class: "wbox mb15 fs1",
                                            rows: "2",
                                            text: dữLiệu.môTả(i, "ụ"),
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
                                    );
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
                      // ảnh nhân dân
                      $("<div>", {
                        class:
                          "pt180 pb40 pt25-xs df aic tpo td5 ttfe bgpc bgsc",
                        style: "background-image: url(/imgs/bg-paper.png);",
                      }).append(
                        $("<div>", { class: "container pr z1 plr25" }).xửLý(
                          "đốiTượng.tải.bàiViết",
                          {
                            d: {
                              thuộcTính: {
                                ụ: ["16909", "~|"],
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
                                  text: dữLiệu.tên(16909, "ụ"),
                                  class: "lh12 fwb fs4 fs16-md mb25 db taj",
                                  style: "color: #C3423F",
                                }),
                                $("<div>", {
                                  text: dữLiệu.môTả(16909, "ụ"),
                                  class: "lh1 fs1-xs fs16 taj",
                                  style: "color: #C3423F",
                                }),
                                $("<div>", {
                                  class: "df mt25 h400",
                                }).append(
                                  a.map(function (i) {
                                    return $("<div>", {
                                      class:
                                        "w10 h1 bấmĐc bgsc bgpc bgrn tpa td5 ttfe",
                                    })
                                      .ảnh(i, "ế", 500)
                                      .hover(
                                        function () {
                                          $(this).sửaLớp("-w10 w40");
                                          $(this).siblings().sửaLớp("-w10 w7");
                                        },
                                        function () {
                                          $(this).sửaLớp("-w40 w10 ");
                                          $(this).siblings().sửaLớp("-w7 w10");
                                        }
                                      )
                                      .tip(dữLiệu.tên(i, "ế"))
                                      .click(function () {
                                        var id = getImgIds(
                                          $("<div>").html(
                                            config("bàiViết." + i + ".ộ")
                                          )
                                        );
                                        quảnTrị.xemẢnh(id);
                                      });
                                  })
                                )
                              );
                            });
                          }
                        )
                      ),

                      // sau 1855
                      $("<div>", {
                        class:
                          "pt180 pt25-xs pb60 tpo td5 ttfe bgpc bgsc pl0-sm pl100",
                        style: "background-image: url(/imgs/trongDongBg.png);",
                      }).append(
                        $("<div>", { class: "container cf pr z1" }).xửLý(
                          "đốiTượng.tải.chuyênMục",
                          {
                            d: {
                              thuộcTính: { p: "1", ụ: ["16908", "~|"] },
                              sắpXếp: "ấ+",
                              giớiHạn: 10,
                            },
                          },
                          function (a) {
                            var t = $(this);
                            CẦN.db("chuyênMục." + a, function () {
                              t.empty().append(
                                $("<a>", {
                                  text: dữLiệu.tên(16908, "ụ"),
                                  class:
                                    "lh12 fwb fs4 fs16-md mb25 bấmĐc tduh db plr25 taj",
                                  style: "color: #EEE4DA",
                                  href: dữLiệu.url(16908, "ụ"),
                                }),
                                $("<div>", {
                                  text: dữLiệu.môTả(16908, "ụ"),
                                  style: "color: #EEE4DA",
                                  class: "lh1 fs1-xs fs16 mt15 plr25 taj",
                                }),

                                $("<div>", { class: "xinChao" }).sờLais(
                                  a.map(function (i) {
                                    return $("<div>", {
                                      class: "col-xs-12 col-sm-4 mt25",
                                    }).append(
                                      $("<a>", {
                                        class: "plr25 db cpi crdh",
                                        href: dữLiệu.url(i, "ụ"),
                                      })
                                        .tip(
                                          "Xem tất cả bài viết trong chuyên mục"
                                        )
                                        .append(
                                          $("<div>", {
                                            class:
                                              "w1 pb169 bgsc bgrn bra10 bóng",
                                          }).ảnh(i, "ụ", true),
                                          $("<div>", {
                                            class: "mtb15 lh1 fs1-xs fs16 fwb",
                                            rows: "1",
                                            text: dữLiệu.tên(i, "ụ"),
                                          }),
                                          $("<div>", {
                                            class: "wbox mb15 fs1",
                                            rows: "2",
                                            text: dữLiệu.môTả(i, "ụ"),
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
                                    );
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
                    )
                );
              };

              $(document).chờKhóa(
                "keyup",
                ".ôTìmkiếm",
                function () {
                  var iTổng = 16899, // Khổng gian tổng chứa các không gian con trên website
                    từKhóa = $(this).val(),
                    ụTổng = khôngGian.chuyênMục.sau(iTổng) || []; // Lấy tất cả chuyên mục trên website
                  $(".bàiViếtTìmKiếm").remove();
                  if (!empty(từKhóa)) {
                    $(".khốiTìmKiếm").append(
                      $("<div>", {
                        class:
                          "col-xs-12 pai r0 t1 hmx3 bgcf z99 oh bw1 bss bca bàiViếtTìmKiếm bóng",
                      }).append(
                        $("<div>", { class: "ps l50 ttx mtb10 wh64" }).append(
                          $("<div>", {
                            class: "bw10 bss bcc bra50 wh1 spin aci",
                            style: "border-top: 10px solid #be4056;",
                          })
                        )
                      )
                    );
                    xửLý(
                      "đốiTượng.tải.bàiViết", // tìm kiếm bài viết
                      {
                        d: {
                          từKhóa: [từKhóa, ["ê"]], // ê là theo tên của bài viết

                          thuộcTính: { ụ: $.gộp([], ụTổng, ["~|"]), p: "1" },
                          sắpXếp: "ấ-",
                          giớiHạn: 20,
                        },
                      },
                      function (i) {
                        if (!empty(i)) {
                          CẦN.db("bàiViết." + i, function () {
                            $(".bàiViếtTìmKiếm").remove();
                            $(".khốiTìmKiếm").append(
                              $("<div>", {
                                class:
                                  "col-xs-12 h400 pai r0 t1 bgcf z99 oya bw1 bss bca bóng bàiViếtTìmKiếm",
                              }).append(
                                i.map(function (á, à) {
                                  var v = config("bàiViết." + á) || {};
                                  if (!empty(v))
                                    return $("<a>", {
                                      href: dữLiệu.url(á, "ế"),
                                      class: "col-xs-12 cl1h c1",
                                      title: dữLiệu.tên(á, "ế"),
                                    })
                                      .append(
                                        $("<div>", {
                                          class: "pa15 df jcsb",
                                        }).append(
                                          $("<div>", {
                                            class: "col-xs-3",
                                          }).append(
                                            $("<div>", {
                                              class: "pb169 bgsc bgrn bgpc",
                                            }).ảnh(á, "ế", true)
                                          ),
                                          $("<div>", {
                                            class: "col-xs-9 bsbb pl15 pr",
                                          }).append(
                                            $("<div>", {
                                              class: "fs11 lh12 fwb tal",
                                            }).cắtDòng(2, dữLiệu.tên(á, "ế")),
                                            $("<div>", {
                                              class: "pa r0 tar",
                                              style: "bottom:-5px;",
                                              html: iDate(v.ấ, "{j}/{n}/{f}"),
                                              icon: "timer::vam,tty-1p",
                                            })
                                          )
                                        )
                                      )
                                      .on("click", function () {
                                        chờ(function () {
                                          $(".bàiViếtTìmKiếm").slideUp();
                                        }, 234);
                                      });
                                })
                              )
                            );
                          });
                        } else {
                          $(".bàiViếtTìmKiếm").remove();
                          $(".khốiTìmKiếm").append(
                            $("<div>", {
                              class:
                                "col-xs-12 pai r0 t1 bgcf z99 bàiViếtTìmKiếm bóng",
                            }).append(
                              $("<div>", {
                                class: "pa15 tac fwb cl1",
                                text: "Không tìm thấy kết quả phù hợp!",
                              })
                            )
                          );
                        }
                      }
                    );
                  }
                },
                1000
              );
              $.each(
                {
                  xửLý: "https://cdn.inevn.com/xửLý",
                  0: function () {
                    TrangChu();
                  },
                  c: function (i) {
                    // Dạng UI có chuyên mục con
                    // Dạng UI không có chuyên mục con và có bài viết
                    thân.empty().append(
                      $("<div>", {
                        class: "container pr pt60 plr25",
                      }).append(
                        $("<div>", {
                          class: "mt25 mb40 plr15-xs z1 pr",
                        }).append(
                          $("<div>", { class: "cf" }).append(
                            // tạo thanh điều hướng mở theo từng cấp
                            bốCục.vụnBánh(i, {
                              // i là ID đối tượng xem
                              ọ: "ụ", // Loại đối tượng xem (Chuyên mục → "ụ", Bài viết → "ế")
                              // menuPhụ: ".menuConChuyênMục",
                              làmMới: true,
                              bo: "gạchChânDòng",
                              idCache: "cache",
                              tải: true,
                              ụ: ụTổng, // ID chuyên mục tổng (Chuyên mục chứa tất cả chuyên mục website)
                            })
                          ),

                          $("<div>", { class: "df fww jcsb" }).xửLý(
                            "đốiTượng.tải.chuyênMục",
                            {
                              d: {
                                thuộcTính: { p: "1", ụ: [i, "~|"] },
                                sắpXếp: "ấ+",
                              },
                            },
                            { cache: true, onCached: true, delay: 1000 },
                            function (s) {
                              // if (this.new) return;
                              // Khi onCached đc chạy -> this.new == true
                              // s: Danh sách bài viết liên quan đến chuyên mục

                              (x = $(this)), (ả = s || []);

                              if (empty(ả)) {
                                // Dạng chuyên mục cha khong có chuyên mục con
                                xửLý(
                                  "đốiTượng.tải.bàiViết",
                                  {
                                    d: {
                                      thuộcTính: {
                                        ụ: [i, "~|"],
                                        p: "1",
                                      },
                                      giớiHạn: 20,
                                      sắpXếp: "ấ+",
                                    },
                                  },
                                  function (idBaiViet) {
                                    CẦN.db("bàiViết." + idBaiViet, function () {
                                      x.empty().append(
                                        $("<div>", {
                                          class: "col-sm-9 col-xs-12 pr df fdc",
                                        }).append(
                                          $("<div>", {
                                            class: "pa t0 b0 l50 ttx",
                                            style:
                                              "width: 4px; background-color: #C3423F",
                                          }),
                                          idBaiViet.map(function (á) {
                                            return $("<div>", {
                                              class:
                                                "pr df fww fdrr jcsa aic timeline-item mt50",
                                            }).append(
                                              $("<div>", {
                                                class:
                                                  "col-xs-12 col-md-5 dn-sm- bgso bgpc bgrn pb51 bra15 tfs11h tpa td5 ttfe bấmĐc",
                                              })
                                                .ảnh(á, "ế", true)
                                                .click(function () {
                                                  var id = getImgIds(
                                                    config(
                                                      "chuyênMục." + á + ".ộ"
                                                    )
                                                  );
                                                  quảnTrị.xemẢnh(id);
                                                })
                                                .nétẢnh(),
                                              $("<div>", {
                                                class:
                                                  "col-xs-12 col-md-6 bgcf bóng pa10 bra15",
                                              }).append(
                                                $("<a>", {
                                                  class:
                                                    "fwb crdh tduh fs16 fs14-md lh12",
                                                  text: dữLiệu.tên(á, "ế"),
                                                  href: dữLiệu.url(á, "ế"),
                                                }),
                                                $("<div>", {
                                                  class: "mt10",
                                                  text: dữLiệu.môTả(
                                                    á,
                                                    "ế",
                                                    180
                                                  ),
                                                }),
                                                $("<div>", {
                                                  class: "mt25 df jcfe aic",
                                                }).append(
                                                  $.icon(
                                                    "schedule:: fs16 fs09-md mr5"
                                                  ),
                                                  $("<div>", {
                                                    class: "",
                                                    text: iDate(
                                                      config(
                                                        "chuyênMục." + á + ".ậ"
                                                      ),
                                                      "DD/MM/YYYY"
                                                    ),
                                                  })
                                                )
                                              )
                                            );
                                          })
                                        ),
                                        $("<div>", {
                                          class: "col-xs-3 df fdc pl25 dn-md-",
                                        }).append(
                                          $("<div>", {
                                            class: "fs16 fs1-md cf fwb mb25",
                                            text: "Các mục thời gian:",
                                          }),
                                          idBaiViet.map(function (á) {
                                            return $("<a>", {
                                              class:
                                                "hoverTicket oh toe wsn tpa td2 ttfe fwb crdh tduh c0 fs1 fs09-md pr lh12 bấmĐc pa10 mb25 brtl30 brbl30 pr35",
                                              text: dữLiệu.tên(á, "ế"),
                                              href: dữLiệu.url(á, "ế"),
                                              style:
                                                "color: #EEE4DA; background-color: #C3423F ",
                                            });
                                          })
                                        )
                                      );
                                    });
                                  }
                                );
                              } else {
                                // dạng không có chuyên mục con và có bài viết
                                CẦN.db("chuyênMục." + ả, function () {
                                  x.empty().append(
                                    $("<div>", {
                                      class: "col-md-9 col-xs-12 pr df fdc",
                                    }).append(
                                      $("<div>", {
                                        class: "pa t0 b0 l50 ttx",
                                        style:
                                          "width: 4px; background-color: #C3423F",
                                      }),
                                      ả.map(function (á) {
                                        return $("<div>", {
                                          class:
                                            "pr df fww fdrr jcsa aic timeline-item mt50",
                                        }).append(
                                          $("<div>", {
                                            class:
                                              "col-xs-12 col-md-5 anhTimeLine bgso bgpc bgrn bra15 tfs11h tpa td5 ttfe bấmĐc",
                                          })
                                            .ảnh(á, "ụ", true)
                                            .click(function () {
                                              var id = getImgIds(
                                                config("chuyênMục." + á + ".ộ")
                                              );
                                              quảnTrị.xemẢnh(id);
                                            })
                                            .nétẢnh(),
                                          $("<div>", {
                                            class:
                                              "col-xs-12 col-md-6 bgcf bóng pa10 bra15",
                                          }).append(
                                            $("<a>", {
                                              class:
                                                "fwb crdh tduh fs16 fs14-md lh12",
                                              text: dữLiệu.tên(á, "ụ"),
                                              href: dữLiệu.url(á, "ụ"),
                                            }),
                                            $("<div>", {
                                              class: "mt10",
                                              text: dữLiệu.môTả(á, "ụ", 180),
                                            }),
                                            $("<div>", {
                                              class: "mt25 df jcfe aic",
                                            }).append(
                                              $.icon(
                                                "schedule:: fs16 fs09-md mr5"
                                              ),
                                              $("<div>", {
                                                class: "",
                                                text: iDate(
                                                  config(
                                                    "chuyênMục." + á + ".ậ"
                                                  ),
                                                  "DD/MM/YYYY"
                                                ),
                                              })
                                            )
                                          )
                                        );
                                      })
                                    ),
                                    $("<div>", {
                                      class: "col-xs-3 df fdc pl25 dn-md-",
                                    }).append(
                                      $("<div>", {
                                        class: "fs16 fs1-md cf fwb mb25",
                                        text: "Các mục thời gian:",
                                      }),
                                      ả.map(function (á) {
                                        return $("<a>", {
                                          class:
                                            "hoverTicket oh toe wsn tpa td2 ttfe fwb crdh tduh c0 fs1 fs09-md pr lh12 bấmĐc pa10 mb25 brtl30 brbl30 pr35",
                                          text: dữLiệu.tên(á, "ụ"),
                                          href: dữLiệu.url(á, "ụ"),
                                          style:
                                            "color: #EEE4DA; background-color: #C3423F ",
                                        });
                                      })
                                    )
                                  );
                                });
                              }
                            }
                          )
                        )
                      )
                    );
                  },
                  a: function (i) {
                    // Code giao diện xem bài viết tại
                    // aside.empty();
                    CẦN.db("bàiViết." + i, function () {
                      thân.empty().append(
                        $("<div>", { class: "container pt60 plr25" }).append(
                          $("<div>", { class: "mt25 mb40 plr15-xs" }).append(
                            $("<div>", { class: "mtb25 cf" }).append(
                              bốCục.vụnBánh(i, {
                                // i là ID đối tượng xem
                                ọ: "ế", // Loại đối tượng xem (Chuyên mục → "ụ", Bài viết → "ế")
                                menuPhụ: "", // Bộ chọn menu phụ (Nếu có)
                                làmMới: false,
                                bo: "gạchChânDòng",
                                idCache: "cache",
                                tải: true,
                                menuPhụ: ".menuConChuyênMục",
                                ụ: ụTổng, // ID chuyên mục tổng (Chuyên mục chứa tất cả chuyên mục website)
                              })
                            ),
                            $("<div>", { class: "mtb25" }).append(
                              $("<div>", {
                                class: "w1 pb21 bgsc bgrn bra10 bóng bấmĐc",
                              })
                                .ảnh(i, "ế", true)
                                .click(function () {
                                  var id = getImgIds(
                                    $("<div>").html(
                                      config("bàiViết." + i + ".ộ")
                                    )
                                  );
                                  quảnTrị.xemẢnh(id);
                                }),
                              $("<div>", {
                                class: "mtb25 cf fwb fs2",
                                text: dữLiệu.tên(i, "ế"),
                              }),
                              $("<div>", { class: "df jcsb" }).append(
                                $("<div>", { class: "df cf" }).append(
                                  $.icon("print:: fs16 mr5"),
                                  $("<div>", {
                                    class: "",
                                    text: "In bài viết",
                                  })
                                ),

                                $("<div>", { class: "df cf" }).append(
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
                              class: "w1 mlra bgcf pa15 lh12 fs12 fs1-xs",
                              html: config("bàiViết." + i + ".ộ"),
                            })
                          )
                        ),
                        $("<button>", {
                          class:
                            "pf wh50 bra50 bss bcrd bw3 o05 o1h cpi bgcf df aic jcsc crdh btn_toTop",
                          style: "bottom:80px;right:30px",
                        })
                          .click(function () {
                            $(window).scrollTop(0);
                          })
                          .append(
                            $("<i>", { class: "fa-solid fa-arrow-up fs16" })
                          )
                      );
                    });
                  },
                  404: function () {
                    vàoURL("/");
                  },
                },
                function (á, à) {
                  config("url." + á, à);
                }
              );
              vàoURL();
            });
          });
        }
      );
    },
  });
});
