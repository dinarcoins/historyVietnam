var chưaCóCache = true,
    data = {
        idBangDiem: "87464cb2f04ed684597433ae9d60935d", // ID dạng md5 của bảng thông tin người chơi cờ vua
        linkKhác: {
            0: "/",
        },
        tênKhác: {
            0: "TrangChu",
        },
        ụHỏiĐáp: [], // MẢng chứa id sử dụng giao diện gửi câu hỏi
    };

var PIECE_SQUARE_TABLES = {
    P: [
        // Tốt (Khai cuộc)
        [0, 0, 0, 0, 0, 0, 0, 0],
        [5, 5, 5, 5, 5, 5, 5, 5],
        [1, 1, 2, 3, 3, 2, 1, 1],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 1, -1, -1, 1, 0, 0],
        [1, 1, 1, -2, -2, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    N: [
        // Mã
        [-5, -4, -3, -3, -3, -3, -4, -5],
        [-4, -2, 0, 0.5, 0.5, 0, -2, -4],
        [-3, 0.5, 1, 1.5, 1.5, 1, 0.5, -3],
        [-3, 0, 1.5, 2, 2, 1.5, 0, -3],
        [-3, 0.5, 1.5, 2, 2, 1.5, 0.5, -3],
        [-3, 0, 1, 1.5, 1.5, 1, 0, -3],
        [-4, -2, 0, 0, 0, 0, -2, -4],
        [-5, -4, -3, -3, -3, -3, -4, -5],
    ],
    K: [
        // vua
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 2, 2, 2, 1, 0],
        [0, 2, 3, 4, 4, 3, 2, 0],
        [0, 2, 4, 5, 5, 4, 2, 0],
        [0, 2, 4, 5, 5, 4, 2, 0],
        [0, 2, 3, 4, 4, 3, 2, 0],
        [0, 1, 2, 2, 2, 2, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    Q: [
        // hậu
        [-2, -1, -1, 0, 0, -1, -1, -2],
        [-1, 0, 1, 1, 1, 1, 0, -1],
        [-1, 1, 2, 2, 2, 2, 1, -1],
        [0, 1, 2, 3, 3, 2, 1, 0],
        [0, 1, 2, 3, 3, 2, 1, 0],
        [-1, 1, 2, 2, 2, 2, 1, -1],
        [-1, 0, 1, 1, 1, 1, 0, -1],
        [-2, -1, -1, 0, 0, -1, -1, -2],
    ],
    R: [
        // xe
        [5, 5, 5, 5, 5, 5, 5, 5],
        [4, 4, 4, 4, 4, 4, 4, 4],
        [3, 3, 3, 3, 3, 3, 3, 3],
        [2, 2, 2, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 2, 2, 2],
        [3, 3, 3, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 4, 4, 4],
        [5, 5, 5, 5, 5, 5, 5, 5],
    ],
    B: [
        // tượng
        [-2, -1, -1, -1, -1, -1, -1, -2],
        [-1, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 1, 1, 1, 1, 0, -1],
        [-1, 0, 1, 2, 2, 1, 0, -1],
        [-1, 0, 1, 2, 2, 1, 0, -1],
        [-1, 0, 1, 1, 1, 1, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, -1],
        [-2, -1, -1, -1, -1, -1, -1, -2],
    ],

    // quân đen
    p: [
        // tốt đen
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 1, -1, -1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    n: [
        // mã đen
        [5, 4, 3, 3, 3, 3, 4, 5],
        [4, 2, 0, -0.5, -0.5, 0, 2, 4],
        [3, -0.5, -1, -1.5, -1.5, -1, -0.5, 3],
        [3, 0, -1.5, -2, -2, -1.5, 0, 3],
        [3, -0.5, -1.5, -2, -2, -1.5, -0.5, 3],
        [3, 0, -1, -1.5, -1.5, -1, 0, 3],
        [4, 2, 0, 0, 0, 0, 2, 4],
        [5, 4, 3, 3, 3, 3, 4, 5],
    ],
    k: [
        // vua đen
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, -2, -2, -2, -2, -1, 0],
        [0, -2, -3, -4, -4, -3, -2, 0],
        [0, -2, -4, -5, -5, -4, -2, 0],
        [0, -2, -4, -5, -5, -4, -2, 0],
        [0, -2, -3, -4, -4, -3, -2, 0],
        [0, -1, -2, -2, -2, -2, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    q: [
        // hậu đen
        [2, 1, 1, 0, 0, 1, 1, 2],
        [1, 0, -1, -1, -1, -1, 0, 1],
        [1, -1, -2, -2, -2, -2, -1, 1],
        [0, -1, -2, -3, -3, -2, -1, 0],
        [0, -1, -2, -3, -3, -2, -1, 0],
        [1, -1, -2, -2, -2, -2, -1, 1],
        [1, 0, -1, -1, -1, -1, 0, 1],
        [2, 1, 1, 0, 0, 1, 1, 2],
    ],
    r: [
        // xe đen
        [-5, -5, -5, -5, -5, -5, -5, -5],
        [-4, -4, -4, -4, -4, -4, -4, -4],
        [-3, -3, -3, -3, -3, -3, -3, -3],
        [-2, -2, -2, -3, -3, -2, -2, -2],
        [-2, -2, -2, -3, -3, -2, -2, -2],
        [-3, -3, -3, -3, -3, -3, -3, -3],
        [-4, -4, -4, -4, -4, -4, -4, -4],
        [-5, -5, -5, -5, -5, -5, -5, -5],
    ],
    b: [
        // tượng đen
        [2, 1, 1, 1, 1, 1, 1, 2],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, -1, -1, -1, -1, 0, 1],
        [1, 0, -1, -2, -2, -1, 0, 1],
        [1, 0, -1, -2, -2, -1, 0, 1],
        [1, 0, -1, -1, -1, -1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [2, 1, 1, 1, 1, 1, 1, 2],
    ],
};

var pieceImages = {
    "♙": "/imgs/pawnWhite.png",
    "♖": "/imgs/rookWhite.png",
    "♘": "/imgs/knightWhite.png",
    "♗": "/imgs/bishopWhite.png",
    "♕": "/imgs/queenWhite.png",
    "♔": "/imgs/kingWhite.png",
    "♟": "/imgs/pawnBlack.png",
    "♜": "/imgs/rookBlack.png",
    "♞": "/imgs/knightBlack.png",
    "♝": "/imgs/bishopBlack.png",
    "♛": "/imgs/queenBlack.png",
    "♚": "/imgs/kingBlack.png",
};

var boardImage = [
    {
        src: "/imgs/kingBlack.png",
        height: "150",
        alt: "kingBlack",
    },
    {
        src: "/imgs/queenBlack.png",
        height: "130",
        alt: "queenBlack",
    },
    {
        src: "/imgs/bishopBlack.png",
        height: "120",
        alt: "bishopBlack",
    },
    {
        src: "/imgs/knightBlack.png",
        height: "110",
        alt: "knightBlack",
    },
    {
        src: "/imgs/rookBlack.png",
        height: "110",
        alt: "rookBlack",
    },
    {
        src: "/imgs/pawnBlack.png",
        height: "100",
        alt: "pawnBlack",
    },
    {
        name: "tốt",
        src: "/imgs/pawnWhite.png",
        height: "100",
        alt: "pawnWhite",
        desc: "Quân tốt di chuyển thẳng một ô về phía trước, nhưng ăn chéo một ô. Ở nước đi đầu tiên, tốt có thể đi hai ô. Khi đến hàng cuối, tốt có thể phong cấp thành hậu, xe, mã hoặc tượng."
    },
    {
        name: "mã",
        src: "/imgs/knightWhite.png",
        height: "110",
        alt: "knightWhite",
        desc: "Quân mã di chuyển theo hình chữ L (2 ô theo một hướng và 1 ô vuông góc), có thể nhảy qua quân khác. Đây là quân duy nhất có thể vượt chướng ngại vật."
    },
    {
        name: "xe",
        src: "/imgs/rookWhite.png",
        height: "110",
        alt: "rookWhite",
        desc: "Quân xe di chuyển theo hàng ngang và dọc, không giới hạn số ô, miễn là không bị cản. Xe tham gia nhập thành với vua nếu đủ điều kiện."
    },
    {
        name: "hậu",
        src: "/imgs/queenWhite.png",
        height: "130",
        alt: "queenWhite",
        desc: "Quân hậu có thể di chuyển theo hàng ngang, dọc và chéo, không giới hạn số ô, miễn là không bị cản. Đây là quân mạnh nhất trên bàn cờ."
    },
    {
        name: "Tượng",
        src: "/imgs/bishopWhite.png",
        height: "120",
        alt: "bishopWhite",
        desc: "Quân tượng di chuyển chéo không giới hạn số ô, miễn là không bị cản. Mỗi tượng chỉ đi trên ô cùng màu suốt ván cờ."
    },
    {
        name: "Vua",
        src: "/imgs/kingWhite.png",
        height: "150",
        alt: "kingWhite",
        desc: "Quân vua di chuyển một ô theo mọi hướng, không thể đứng cạnh vua đối phương và bị chiếu hết thì thua."
    },
]

var board,
    game = new Chess(),
    modeGame = "human",
    whitePlayerName = "", // tên người chơi trắng (2) - tên 
    blackPlayerName = "", // tên người chơi đen (2) - tên
    modeAi = "easy",
    selectedSquare = null,
    confirmCallback = null,
    whiteTime = 600,
    blackTime = 600,
    currentTimer = null,
    idGame,
    statusGameOnline,  // trạng thái ván chơi  _KdfHv: ongoing, _AckSA: checkmate, _HCtbV: stalemate, _9o1ve: pending, _Avuwo: draw, _4TnJ0: resign, _yCtjb: timeout
    blackPlayer, // kiểm tra người chơi đen - "{"à": "1234566"}"
    whitePlayer, // kiểm tra người chơi trắng - "{"à": "1234566"}"
    winnerPlayer, // người chơi thắng - "{"à": "1234566"}"
    gameFenOnline, // bàn cờ dạng FEN - "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    turnOnline, // lượt chơi hiện tại - white: "w"; black: "b";
    statusEndGame, // trạng thái kết thúc game - 0: No; 1: Yes
    capturePieces,// quân cờ đã bị ăn - []
    history; // lịch sử nước đi - []

var config = {
    position: "start",
    showNotation: true,
    draggable: true,
    dropOffBoard: "snapback",
    snapbackSpeed: 200,
    snapSpeed: 50,
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
        màuNền: "#665a5a", //Màu nền chờ
        riêng: true, //tải theo thư viện khác
        cache: true, //Tải cache các file package
        trước: function () { },
        xong: function () {

            var idBangDiem = data.idBangDiem,
                đầu,
                thân,
                footer,
                đăngNhậpXong = config("đăngNhậpXong") || rf,
                isSoundOn = true, checkmateEval = 100000;

            var thongBao = function (status, message) {
                const icons = {
                    success: "emoji_emotions",
                    error: "sentiment_very_dissatisfied",
                    warning: "sentiment_dissatisfied",
                };
                const icon = icons[status];
                const notification = $('<div>', { class: `thongBao pa15 bra10 fs1 text cf o0 tpa td5 ttfe w300 ${status}`, text: message, icon: icon })
                $(".hopThongBao").append(notification);

                setTimeout(() => {
                    notification.sửaLớp("show");
                }, 100);

                setTimeout(() => {
                    notification.sửaLớp("-show");
                    setTimeout(() => {
                        notification.remove();
                    }, 500);
                }, 5000);
            }

            var generatorGame = function () {
                xửLý("đốiTượng.tạo." + data.idBangDiem, function (id) {
                    if (id) {
                        idGame = id;
                        const gameData = {
                            13270796: `{\"à\":\"${tôi.lấy("i")}\"}`, // Người chơi trắng (host)
                            13270797: "", // Người chơi đen (chưa có)
                            13270645: "_9o1ve", // Trạng thái: pending
                            13287375: "0", // Chưa kết thúc
                            13270648: game.fen(), // FEN ban đầu
                            13270650: game.turn(), // Lượt đi đầu tiên
                            13270654: whiteTime, // Thời gian trắng
                            13270681: blackTime, // Thời gian đen
                            13270646: "", // Người thắng
                            13270652: "", // Quân bị ăn
                            13604592: game.history({ verbose: true }), // Lịch sử nước đi
                        };
                        xửLý("thuộcTính.sửa." + data.idBangDiem, { d: [id, gameData] }, { đồngBộ: true, chờ: [true, "Đang tạo ván chơi....."] }, function (status) {
                            if (status) {
                                vàoURL("/online/" + id); // Chuyển đến giao diện game
                                checkForSecondPlayer(); // Kiểm tra người chơi thứ hai
                            } else {
                                thongBao("error", "Lỗi tạo ván chơi!");
                            }
                        });
                    }
                });
            };

            var checkForSecondPlayer = function () {
                const interval = setInterval(function () {
                    CẦN.db(data.idBangDiem + "." + idGame, function (s) {
                        if (s && s[13270797]) { // Có người chơi đen
                            clearInterval(interval); // Dừng kiểm tra
                            syncOnlineGame(); // Bắt đầu đồng bộ
                            setInterval(syncOnlineGame, 2000); // Đồng bộ mỗi 2 giây
                        }
                    });
                }, 2000); // Kiểm tra mỗi 2 giây
            };


            var joinInGame = function (id) {
                const updateData = {
                    13270797: `{\"à\":\"${tôi.lấy("i")}\"}`, // Quân đen
                    13270645: "_KdfHv", // Trạng thái: đang chơi
                };
                xửLý("thuộcTính.sửa." + data.idBangDiem, { d: [id, updateData] }, { đồngBộ: true }, function (status) {
                    if (status) {
                        thongBao("success", "Tham gia ván chơi thành công!");
                        idGame = id;
                        vàoURL("/online/" + id); // Chuyển vào giao diện game
                    } else {
                        thongBao("error", "Lỗi khi tham gia ván chơi!");
                    }
                });
            };

            var syncOnlineGame = function () {
                CẦN.db(data.idBangDiem + "." + idGame, function (s) {
                    if (s) {
                        cl("LOGGGGGGGG", s)
                        game.load(s[13270648]); // Cập nhật bàn cờ
                        drawBoard(); // Vẽ lại bàn cờ
                        $('.whitePlayerName').text(dữLiệu.tên(có("à", s[13270796]), "à") || "Đang chờ...");
                        $('.blackPlayerName').text(dữLiệu.tên(có("à", s[13270797]), "à") || "Đang chờ...");
                        $('.avataBlackPlayer').ảnh(có("à", blackPlayer), "à")
                        $('.avataWhitePlayer').ảnh(có("à", whitePlayer), "à")


                        statusGameOnline = s[13270645];
                        blackPlayer = s[13270797];
                        whitePlayer = s[13270796];
                        blackPlayerName = dữLiệu.tên(có("à", s[13270797]), "à") || "Đang chờ...";
                        whitePlayerName = dữLiệu.tên(có("à", s[13270796]), "à") || "Đang chờ...";
                        winnerPlayer = s[13270646];
                        gameFenOnline = s[13270648];
                        turnOnline = s[13270650];
                        blackTime = s[13270654];
                        whiteTime = s[13270681];
                        statusEndGame = s[13287375];
                        capturePieces = s[13270652];
                        history = s[13604592];

                        updateTimerDisplay(turnOnline === "w");
                        updateMoveHistory();
                        updateCapturedPieces();
                        updateStatus();

                        // Xử lý trạng thái kết thúc`
                        if (statusEndGame === "1") {
                            endGame();
                            let message = "";
                            switch (statusGameOnline) {
                                case "_AckSA":
                                    message = `Chiếu hết! ${winnerPlayer === whitePlayer ? whitePlayerName : blackPlayerName} thắng!`;
                                    break;
                                case "_HCtbV":
                                    message = "Hòa cờ - Hết nước đi!";
                                    break;
                                case "_Avuwo":
                                    message = "Hòa cờ!";
                                    break;
                                case "_4TnJ0":
                                    message = `${winnerPlayer === whitePlayer ? blackPlayerName : whitePlayerName} đã đầu hàng! ${winnerPlayer === whitePlayer ? whitePlayerName : blackPlayerName} thắng!`;
                                    break;
                                case "_yCtjb":
                                    message = `${winnerPlayer === whitePlayer ? blackPlayerName : whitePlayerName} hết thời gian! ${winnerPlayer === whitePlayer ? whitePlayerName : blackPlayerName} thắng!`;
                                    break;
                            }
                            thongBao(statusGameOnline === "_HCtbV" || statusGameOnline === "_Avuwo" ? "warning" : "success", message);
                        } else if (blackTime <= 0 || whiteTime <= 0) {
                            const winner = blackTime <= 0 ? whitePlayer : blackPlayer;
                            const gameData = {
                                13287375: "1",
                                13270645: "_yCtjb",
                                13270646: winner,
                            };
                            xửLý("thuộcTính.sửa." + data.idBangDiem, { d: [idGame, gameData] }, { đồngBộ: true });
                        }
                    }
                });
            };

            // thua
            var surrenderGame = function () {
                var winner = game.turn() === "w" ? blackPlayer['à'] : whitePlayer['à'];
                var winnerName = game.turn() === "w" ? blackPlayerName : whitePlayerName;
                endGame();
                thongBao("warning", `Bạn đã đầu hàng! ${winnerName} thắng.`);

                if (modeGame === "human" && idGame) {
                    const gameData = {
                        13287375: "1",
                        13270645: "_4TnJ0",
                        13270648: game.fen(),
                        13270646: winner,
                    };
                    xửLý("thuộcTính.sửa." + data.idBangDiem, { d: [idGame, gameData] }, { đồngBộ: true });
                }
            };

            var startGame = function () {
                game.reset();
                whiteTime = 600;
                blackTime = 600;
                selectedSquare = null;
                drawBoard();
                updateStatus();
                updateMoveHistory();
                updateCapturedPieces();

                if (modeGame === "human") {
                    $('.whitePlayerName').text(whitePlayerName || "Đang chờ...");
                    $('.blackPlayerName').text(blackPlayerName || "Đang chờ...");
                    setInterval(syncOnlineGame, 2000); // Bắt đầu đồng bộ
                } else {
                    countTime();
                    $('.whitePlayerName').text(tôi.lấy("hiểnThị") + " (bạn)");
                    $('.blackPlayerName').text("BOT (đối thủ)");
                    if (game.turn() === "b") setTimeout(makeAIMove, 2000);
                }
            };

            var countTime = function () {
                if (currentTimer) {
                    clearInterval(currentTimer);
                }

                const isWhiteTurn = game.turn() === "w";
                let activeTime = isWhiteTurn ? whiteTime : blackTime;

                updateTimerDisplay(isWhiteTurn);

                currentTimer = setInterval(() => {
                    if (isWhiteTurn) {
                        whiteTime--;
                        activeTime = whiteTime;
                    } else {
                        blackTime--;
                        activeTime = blackTime;
                    }

                    updateTimerDisplay(isWhiteTurn);

                    if (activeTime <= 0) {
                        clearInterval(currentTimer);
                        currentTimer = null;
                        endGameDueToTime(isWhiteTurn ? "Black" : "White");
                    }
                }, 1000);
            }

            var updateMoveHistory = function () {
                const movesContainer = $(".moves");
                movesContainer.empty(); // Xóa nội dung cũ trước khi cập nhật

                const history = game.history({ verbose: true }); // Lấy lịch sử nước đi với chi tiết
                // if (history.length === 0) {
                //     movesContainer.append($("<div>", { class: "text cf fs11 title", text: "Chưa có nước đi nào" }));
                //     return;
                // }

                // Chia lịch sử thành các lượt (mỗi lượt gồm nước đi của trắng và đen nếu có)
                for (let i = 0; i < history.length; i += 2) {
                    const whiteMove = history[i];
                    const blackMove = history[i + 1] || null;
                    const moveNumber = Math.floor(i / 2) + 1;

                    const moveRow = $("<div>", { class: "df jcsb aic w1 c0 fwb mb5 text fs11" }).append(
                        $("<div>", { text: `${moveNumber}.` }), // Số thứ tự lượt
                        $("<div>", { text: whiteMove ? `${whiteMove.from}-${whiteMove.to}` : "-" }), // Nước đi của trắng
                        $("<div>", { text: blackMove ? `${blackMove.from}-${blackMove.to}` : "-" }) // Nước đi của đen
                    );

                    movesContainer.append(moveRow);
                }

                // Cuộn xuống dưới cùng nếu danh sách quá dài
                movesContainer.scrollTop(movesContainer[0].scrollHeight);
            };

            var updateTimerDisplay = function (isWhiteTurn) {
                const whiteMinutes = Math.floor(whiteTime / 60);
                const whiteSeconds = whiteTime % 60;
                const blackMinutes = Math.floor(blackTime / 60);
                const blackSeconds = blackTime % 60;

                $("#whiteTimer").text(`${whiteMinutes}:${whiteSeconds < 10 ? "0" : ""}${whiteSeconds}`);
                $("#blackTimer").text(`${blackMinutes}:${blackSeconds < 10 ? "0" : ""}${blackSeconds}`);

                if (isWhiteTurn) {
                    $("#whiteTimer").sửaLớp("cg0,-cf,-vôHiệu");
                    $("#blackTimer").sửaLớp("-cg0,cf,vôHiệu");
                } else {
                    $("#whiteTimer").sửaLớp("-cg0,cf,vôHiệu");
                    $("#blackTimer").sửaLớp("cg0,-cf,-vôHiệu");
                }
            }

            var endGameDueToTime = function (winner) {
                $(".square").off("click").sửaLớp("vôHiệu");
                game.header("Result", winner + " thắng do hết thời gian");
                thongBao("warning", `${winner} thắng vì đối thủ hết thời gian!`);
                updateStatus();
            }

            // hàm lấy những quân cờ đã bị ăn
            var getCapturedPieces = function (game) {
                let capturedPieces = [];

                game.history({ verbose: true }).forEach((move) => {
                    move.captured && capturedPieces.push({
                        piece: move.captured,
                        color: move.color === "w" ? "b" : "w",
                    });
                });

                return capturedPieces;
            }

            // Hàm để lấy ký hiệu quân cờ
            var getPieceSymbol = function (piece) {
                var symbols = {
                    p: "♟",
                    r: "♜",
                    n: "♞",
                    b: "♝",
                    q: "♛",
                    k: "♚",
                    P: "♙",
                    R: "♖",
                    N: "♘",
                    B: "♗",
                    Q: "♕",
                    K: "♔",
                };
                return (
                    symbols[piece.color === "w" ? piece.type.toUpperCase() : piece.type] || ""
                );
            }

            var setting = function () {
                khung(
                    $("<div>", {
                        class: "pa15 df fdc jcc aic col-xs-12",
                    }).append(
                        $("<div>", {
                            class: "df jcc aic col-xs-12 fs2 fwb title",
                            text: "Cài đặt trò chơi"
                        }),
                    ),
                    "__khung",
                    {
                        tiêuĐề:
                            "Cài đặt",
                        ngoài: "",
                        trong: "col-xs-3",
                        koTắt: false,
                        onShow: function () { },
                        onHide: function () { },
                    }
                )
            }

            var drawBoard = function () {
                $("#chessboard").empty();
                for (var row = 0; row < 8; row++) {
                    for (var col = 0; col < 8; col++) {
                        var square = $("<div></div>")
                            .sửaLớp((row + col) % 2 === 0 ? "square,light" : "square,dark")
                            .data("row", row)
                            .data("col", col);
                        var squareName = String.fromCharCode(97 + col) + (8 - row);
                        var piece = game.get(squareName);
                        if (piece) {
                            square.append(
                                $("<img>")
                                    .attr("src", pieceImages[getPieceSymbol(piece)])
                                    .attr("alt", piece.type)
                                    .sửaLớp("pieceImage")
                            );
                        }
                        square.on("click", handleSquareClick); // Gắn lại sự kiện click
                        $("#chessboard").append(square);
                    }
                }
            };

            var handleSquareClick = function (event) {
                var $square = $(event.target).closest(".square");
                if (!$square.length) return;

                var row = $square.data("row");
                var col = $square.data("col");
                var to = { row: row, col: col };

                $(".square.selected").sửaLớp("-selected");
                $(".square.possibleMove").sửaLớp("-possibleMove");

                if (selectedSquare) {
                    var fromPosition = String.fromCharCode(97 + selectedSquare.col) + (8 - selectedSquare.row);
                    var toPosition = String.fromCharCode(97 + to.col) + (8 - to.row);

                    var move = game.move({
                        from: fromPosition,
                        to: toPosition,
                        promotion: "q"
                    });

                    if (move) {
                        drawBoard();
                        updateStatus();
                        updateMoveHistory();
                        updateCapturedPieces();

                        if (modeGame === "human" && idGame) {
                            const gameData = {
                                13270648: game.fen(),
                                13270650: game.turn(),
                                13270652: getCapturedPieces(game),
                                13604592: game.history({ verbose: true }),
                            };
                            xửLý("thuộcTính.sửa." + data.idBangDiem, { d: [idGame, gameData] }, { đồngBộ: true, chờ: true }, function (status) {
                                if (!status) {
                                    thongBao("error", "Lỗi đồng bộ nước đi!");
                                    game.undo(); // Hoàn tác nếu server không xác nhận
                                    drawBoard();
                                }
                            });
                        } else {
                            countTime();
                        }

                        if (game.game_over()) {
                            if (currentTimer) {
                                clearInterval(currentTimer);
                                currentTimer = null;
                            }
                            endGame();
                            if (modeGame === "human" && idGame) {
                                const gameData = {
                                    13287375: "1",
                                    13270645: game.in_checkmate() ? "_AckSA" : game.in_stalemate() ? "_HCtbV" : "_Avuwo",
                                    13270646: game.in_checkmate() ? (game.turn() === "w" ? blackPlayer['à'] : whitePlayer['à']) : "",
                                };
                                xửLý("thuộcTính.sửa." + data.idBangDiem, { d: [idGame, gameData] }, { đồngBộ: true, chờ: true });
                            }
                        } else if (modeGame === "ai" && game.turn() === "b") {
                            setTimeout(makeAIMove, 500);
                        }
                    } else {
                        cl("Invalid move");
                    }

                    selectedSquare = null;
                } else {
                    var squareName = String.fromCharCode(97 + col) + (8 - row);
                    var piece = game.get(squareName);

                    if (piece && piece.color === game.turn()) {
                        if (modeGame === "human") {
                            var myId = tôi.lấy("i");
                            var whiteId = có("à", whitePlayer); // Trích xuất ID của người chơi trắng
                            var blackId = có("à", blackPlayer); // Trích xuất ID của người chơi đen
                            var isMyTurn = (piece.color === "w" && myId === whiteId) ||
                                (piece.color === "b" && myId === blackId);
                            if (!isMyTurn) {
                                thongBao("warning", "Không phải lượt của bạn!");
                                return;
                            }

                            selectedSquare = to;
                            $square.sửaLớp("selected");

                            var moves = game.moves({ square: squareName, verbose: true });
                            moves.forEach(function (move) {
                                var targetSquare = $(`[data-row='${8 - move.to[1]}'][data-col='${move.to.charCodeAt(0) - 97}']`);
                                if (targetSquare.length) {
                                    targetSquare.sửaLớp("possibleMove");
                                }
                            });
                        } else {
                            selectedSquare = to;
                            $square.sửaLớp("selected");

                            var moves = game.moves({ square: squareName, verbose: true });
                            moves.forEach(function (move) {
                                var targetSquare = $(`[data-row='${8 - move.to[1]}'][data-col='${move.to.charCodeAt(0) - 97}']`);
                                if (targetSquare.length) {
                                    targetSquare.sửaLớp("possibleMove");
                                }
                            });
                        }
                    }
                }
            };

            // Hàm cập nhật danh sách quân cờ bị ăn
            var updateCapturedPieces = function () {
                const capturedPieces = getCapturedPieces(game);
                const whiteCaptured = $("#whiteCaptured");
                const blackCaptured = $("#blackCaptured");

                whiteCaptured.empty();
                blackCaptured.empty();

                capturedPieces.forEach(({ piece, color }) => {
                    const img = $("<img>")
                        .attr("src", pieceImages[getPieceSymbol({ type: piece, color })])
                        .sửaLớp("wh28");

                    if (color === "w") {
                        blackCaptured.append(img); // Quân trắng bị ăn -> hiện ở danh sách của đen
                    } else {
                        whiteCaptured.append(img); // Quân đen bị ăn -> hiện ở danh sách của trắng
                    }
                });
            }
            // kết thúc game
            var endGame = function () {
                $(".square").off("click").sửaLớp('vôHiệu');
                $('.đầuHàng').sửaLớp("vôHiệu");
                if (currentTimer) {
                    clearInterval(currentTimer);
                    currentTimer = null;
                }
            }
            // dùng game
            var stopGame = function () {
                $(".square").off("click").sửaLớp("vôHiệu");
                $(".đầuHàng").sửaLớp("vôHiệu");
                if (currentTimer) {
                    clearInterval(currentTimer);
                    currentTimer = null;
                }
                if (modeGame === "human") {
                    const gameData = {
                        13287375: "1",
                        13270645: "_4TnJ0",
                        13270648: game.fen(),
                    };
                    xửLý("thuộcTính.sửa." + data.idBangDiem, { d: [idGame, gameData] }, { đồngBộ: true }, function (status) {
                        if (status) {
                            thongBao("success", "Đã thoát game!");
                        } else {
                            thongBao("error", "Lỗi khi lưu trạng thái game!");
                        }
                    });
                } else {
                    thongBao("success", "Đã thoát game!");
                }
                game.reset();
                idGame = null;
                selectedSquare = null;
            };

            // Hàm để cập nhật trạng thái game
            var updateStatus = function () {
                if (game.in_checkmate()) {
                    endGame();
                    thongBao('success', "Checkmate! " + (game.turn() === "w" ? "Black wins!" : "White wins!"));
                } else if (game.in_stalemate()) {
                    endGame();
                    thongBao('error', "Hết nước chơi");
                } else if (game.in_draw()) {
                    endGame();
                    thongBao('warning', "Hoà cờ nhé");
                } else if (game.in_check()) {
                    thongBao("warning", game.turn() === "w" ? "White king in check!" : "Black king in check!");
                } else if (game.game_over()) {
                    thongBao("error", "Hết game dòi!");
                    endGame();
                } else {
                    statusMessage = game.turn() === "w" ? "White to move" : "Black to move";
                }

                return updateCapturedPieces();
            }

            // Hàm để reset game
            var resetGame = function () {
                game.reset();
                whiteTime = 600;
                blackTime = 600;
                currentTimer && clearInterval(currentTimer);
                currentTimer = null;
                drawBoard();
                updateStatus();
                updateMoveHistory();
                countTime();
            };

            // Hàm để hoàn tác nước cờ đã đánh
            var undoLastMove = function () {
                var lastMove = game.undo();
                if (lastMove) {
                    drawBoard();
                    updateStatus();
                    updateMoveHistory();
                    selectedSquare = null;
                } else {
                    thongBao("error", "Không thể hoàn tác!");
                }
            };

            var pieceValues = {
                p: 100,
                n: 320,
                b: 330,
                r: 500,
                q: 900,
                k: 20000
            };

            var makeAIMove = function () {
                let depth;
                switch (modeAi) {
                    case "easy": depth = 1; break;
                    case "hard": depth = 3; break;
                    case "hardest": depth = 4; break;
                    default: depth = 1;
                }

                const maximizing = game.turn() === "w";
                const [bestMove, bestEval] = minimax(game, depth, -Infinity, Infinity, maximizing);

                if (bestMove) {
                    game.move(bestMove);
                    drawBoard();
                    updateStatus();
                    updateMoveHistory();
                    countTime();
                    if (game.game_over()) {
                        currentTimer && clearInterval(currentTimer), currentTimer = null;
                        $(".square").off("click").sửaLớp('vôHiệu');
                        $('.đầuHàng').sửaLớp("vôHiệu");
                    }
                } else {
                    thongBao("error", "AI không tìm thấy nước đi!");
                }
            };

            var evaluatePosition = function (position) {
                if (position.in_checkmate()) {
                    return position.turn() === "w" ? -checkmateEval : checkmateEval;
                } else if (position.in_draw() || position.in_stalemate()) {
                    return 0;
                }

                let evaluation = 0;

                for (let row = 0; row < 8; row++) {
                    for (let col = 0; col < 8; col++) {
                        const square = String.fromCharCode(97 + col) + (8 - row);
                        const piece = position.get(square);
                        if (piece) {
                            const pieceType = piece.color === "w" ? piece.type.toUpperCase() : piece.type;
                            const value = pieceValues[piece.type] || 0;
                            const pstValue = PIECE_SQUARE_TABLES[pieceType][row][col] * 10;
                            evaluation += piece.color === "w" ? value + pstValue : -(value + pstValue);
                        }
                    }
                }

                if (position.in_check()) {
                    evaluation += position.turn() === "w" ? -50 : 50;
                }

                const mobility = position.moves().length;
                evaluation += position.turn() === "w" ? mobility * 2 : -mobility * 2;

                return evaluation;
            }

            var sortMoves = function (position, moves) {
                const scoredMoves = moves.map((move) => {
                    const moveObj = position.move(move, { dry_run: true, verbose: true });
                    let score = 0;

                    if (moveObj.captured) {
                        const capturedValue = pieceValues[moveObj.captured] || 0;
                        const pieceValue = pieceValues[moveObj.piece] || 0;
                        score += 10 * capturedValue - pieceValue;
                    }

                    position.move(moveObj);
                    if (position.in_check()) {
                        score += 100;
                    }
                    position.undo();

                    return { move, score };
                });

                scoredMoves.sort((a, b) => b.score - a.score);
                return scoredMoves.map((m) => m.move);
            }

            var minimax = function (position, depth, alpha, beta, maximizingPlayer) {
                if (depth === 0 || position.in_checkmate() || position.in_draw()) {
                    return [null, evaluatePosition(position)];
                }

                const moves = sortMoves(position, position.moves());
                let bestMove = null;

                if (maximizingPlayer) {
                    let maxEval = -Infinity;
                    for (const move of moves) {
                        position.move(move);
                        const [, eval] = minimax(position, depth - 1, alpha, beta, false);
                        position.undo();

                        if (eval > maxEval) {
                            maxEval = eval;
                            bestMove = move;
                        }

                        alpha = Math.max(alpha, eval);
                        if (beta <= alpha) break;
                    }
                    return [bestMove, maxEval];
                } else {
                    let minEval = Infinity;
                    for (const move of moves) {
                        position.move(move);
                        const [, eval] = minimax(position, depth - 1, alpha, beta, true);
                        position.undo();

                        if (eval < minEval) {
                            minEval = eval;
                            bestMove = move;
                        }

                        beta = Math.min(beta, eval);
                        if (beta <= alpha) break;
                    }
                    return [bestMove, minEval];
                }
            }

            // Viết code giao diện hiển thị
            CẦN.js(
                [
                    "https://thuctap.inevn.com/nguyendinhhuy/js/function.min.js",
                ],
                true,
                function () {
                    CẦN.js(
                        [
                            "https://thuctap.ine.vn/nguyendinhhuy/js/include.core.min.js",
                            "https://thuctap.inevn.com/nguyendinhhuy/CauHinhWeb/js/include.min.js?=123",
                        ],
                        true,
                        function () {
                            // toggleSound(true)
                            $(".wrapper")
                                .empty()
                                .append(
                                    (đầu = $("<div>", { class: 'w1 pr z1', style: "--s: 51px;--c1: #5e5e5e;  --c2: #292929; --_g:  var(--c2) 6%  14%,var(--c1) 16% 24%,var(--c2) 26% 34%,var(--c1) 36% 44%,  var(--c2) 46% 54%,var(--c1) 56% 64%,var(--c2) 66% 74%,var(--c1) 76% 84%,var(--c2) 86% 94%; background: radial-gradient(100% 100% at 100% 0,var(--c1) 4%,var(--_g),#0008 96%,#0000),  radial-gradient(100% 100% at 0 100%,#0000, #0008 4%,var(--_g),var(--c1) 96%)  var(--c1);  background-size: var(--s) var(--s);  ", })),
                                    (thân = $("<div>", { class: "w1" })),
                                    (footer = $("<div>", { class: "w1 df jcc aic pr", style: "background-color: #665a5a" }))
                                );
                            var header = function () {
                                đầu.empty().append(
                                    $("<div>", { class: "thanhĐầu bóng z11 pr", classM: "" }).data("trangTrí", 1).self("trangTrí", function () {
                                        $(this).empty().append(
                                            $("<div>", {
                                                class: "thanhMenu ",
                                                classM: "-plr50",
                                            }).append(
                                                $("<div>", { class: "w1" }).append(
                                                    // Tạo thanh menu trên thiết bị không phải là mobile
                                                    !là("M") &&
                                                    bốCục.thanhMenu({
                                                        ả: ["/imgs/logo.jpg"], // Ảnh logo. Mặc định ảnh logo hệ thống
                                                        gạch: false,
                                                        tiêuĐề: {
                                                            //truyền false: để trống tiêu đề
                                                            trên: "I&E Vietnam", // Tên ở trên
                                                            dưới: "Chess Game", // Tên ở dưới
                                                        },
                                                        container: false, // Bỏ class container
                                                        treo: false,
                                                        bo: là("W") ? "container " : "-pr,ps,t0,ce,z3",
                                                        sửaLớp: {
                                                            ả: "bra50i",
                                                            oh: "-oh",
                                                            ov: "-plr10,-bgcf",
                                                            "pr.cb": "jcsb,-cb,df,aic",
                                                            ptb7: "-ptb7",
                                                            trên: "ttu,fwb,-fs08,fs1,cf",
                                                            dưới: "-ffb,-fs085,-ttu,fs1,fwb,ffssp,cf",
                                                            tiêuĐề: "-lh13,lh14",
                                                            logo: "làmMớiTrangChủ,-ml5",
                                                            nút:
                                                                "-wh1,-pa,-bg1,-cf,-c0,h1,z1,-w70" +
                                                                (lÀ("LG", { ratio: 1 }) ? "," : ""), // ,-w70
                                                            "pa.w50": "dn",
                                                            "⁄": "dn",
                                                            chứaNút: "df,aic,h1,-plr15, bgcr2,cf",
                                                            wh50: "logoTrên,mtb5,mr10,bra50i",
                                                            logoTrên: "-mlr5,bra50i",
                                                            "logoTrên:first": "tfs09",
                                                            đăngNhập: "cf",

                                                        },
                                                        menu: {
                                                            id: false,
                                                            iconHome: true, // Hiển thị icon home
                                                            trangChủ: 0, // ID của trang chủ. Nếu iconHome có giá trị TRUE và menu hiển thị có id trùng với id trang chủ => Hiển thị icon
                                                            bo: "c0", // Class sửa lớp thẻ chứa tất cả menu
                                                            bọc: "-ptb15,-ttu", // Class sửa lớp của thẻ có class "menuChính"
                                                            boChọn: "cl1h",
                                                            chọn: "cl1", // Class active menu
                                                            sửaLớp: {
                                                                "menuChính>a":
                                                                    "-fs08,fs09,pa10,-pa15,df, aic, jcsc",

                                                            },
                                                            xong: function () { },
                                                        },
                                                        menuGiả: false,
                                                        đăngNhập: {
                                                            ê: "Đăng nhập",
                                                            icon: true,
                                                            thôngBáo: false,
                                                            tinNhắn: false,
                                                            chữ: false,
                                                            đốiTượng: "tài khoản",
                                                            sửaLớp: {
                                                                đăngNhập:
                                                                    "-bg1a,-gạchChân,-cl1,bgcffa,wsn,shineh,ptb5,-ptb15,-tduh,c0",
                                                                ảnhĐạiDiện: "-ptb10,-plr10 ",
                                                                độngĐc: "-wh25,wh40,-bra50,bra10",
                                                                "thôngTinTàiKhoản": "-pl10,bgcr2"
                                                            },
                                                            icon: {
                                                                đăngNhập: "login::fs18,tty-1p,O,c0",
                                                            },
                                                            đăngXuất: function (ả) {
                                                                ả && đăngNhậpXong();
                                                            },
                                                            đăngNhập: {
                                                                chữ: false,
                                                                gạchChân: false,
                                                                f: function (ả) {
                                                                    ả && đăngNhậpXong();
                                                                },
                                                            },
                                                        },
                                                        xong: function () {
                                                        },
                                                    }),
                                                )
                                            )
                                        );
                                    }).trigger("trangTrí")
                                )
                            }
                            footer.empty().append(
                                $('<div>', { class: 'container' }).append(
                                    $("<div>", {
                                        class: "cf vôHiệu",
                                        html: "&copy; Make by DinarCoins - From I&E Vietnam",
                                    })
                                ),

                            )
                            // Trang chủ
                            var TrangChu = function () {
                                thân.empty().append(
                                    $('<div>', { class: "w1 plr15", style: "background: #665a5a; background: radial-gradient(circle, rgba(102,90,90,1) 0%, rgba(0,0,0,1) 100%);" }).append(
                                        $('<div>', { class: "container" }).append(
                                            $('<div>', { class: "df pr jcc fdc aic ptb50" }).append(
                                                $('<div>', { class: "bra10 pa15 col-xs-12 col-md-6", style: "--s: 100px;--c1: #060606;--c2: #2d2727;--c3: #352f2f;background:repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 50%)calc(var(--s)/2) calc(var(--s)*tan(30deg)/2),repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 50%);background-size: var(--s) calc(var(--s)*tan(30deg));" }).append(
                                                    $('<div>', { class: "fs2-sm fs7 cf fwb lh12 title shine", text: "Chess Game" }),
                                                    $('<a>', { href: "/menu", class: "bấmĐc db fs16 fwb lh1 tac bgcr3 bgcr4h cf title", text: "play", icon: "play_arrow", style: " --s: 5px;--w: 120px;width: round(var(--w),4*var(--s)); aspect-ratio: 0;padding: var(--s);border: var(--s) solid #0000;box-sizing: border-box;border-radius: calc(3.5*var(--s)); mask: radial-gradient(calc(sqrt(2)*var(--s)),#000 calc(100% - 1px),#0000),conic-gradient(#000 0 0) content-box,radial-gradient(calc(sqrt(2)*var(--s)),#0000 100%,#000 calc(100% + 1px)) var(--s) var(--s) padding-box;mask-size: calc(var(--s)*4) calc(var(--s)*4);" }),
                                                ),
                                                $('<div>', { class: "col-xs-12 df jcc aic fdc" }).append(
                                                    $("<img>", {
                                                        src: "/imgs/chessboard.png",
                                                        class: "o08 tada ad1 ttfl tfs12h tpa ttfl td2",
                                                        alt: "chessbanner",
                                                    }),

                                                )
                                            )
                                        )
                                    ),
                                    $('<div>', { class: "w1 bgcf ptb50 plr15" }).append(
                                        $('<div>', { class: "container" }).append(
                                            $('<div>', { class: "col-xs-12 df fww" }).append(
                                                $('<div>', { class: "df fdc aic fcc col-xs-12" }).append(
                                                    $('<div>', { class: "fs3 fwb title c0", text: "The Chess" }),
                                                    $('<div>', { class: "fs1 c0 tac mt25", text: "Cờ vua là trò chơi trí tuệ dành cho hai người, chơi trên bàn cờ 8x8 ô. Mỗi bên điều khiển 16 quân cờ với mục tiêu chiếu hết vua đối phương. Trò chơi đòi hỏi chiến thuật, tư duy logic và kỹ năng tính toán nước đi." })
                                                ),
                                                $('<div>', { class: "df jcc aife col-xs-12" }).append(
                                                    boardImage.map(function (item, i) {
                                                        return $("<img>", {
                                                            src: item.src,
                                                            class: "o08 col-xs-1",
                                                            alt: item.alt,
                                                            style: `height: ${!là("M") ? item.height : item.height / 3}px`
                                                        })
                                                    }),
                                                ),
                                            )
                                        )
                                    ),
                                    $('<div>', { class: "w1 df ptb50 fww jcc aic", style: "--s: 100px;--c1: #060606;--c2: #2d2727;--c3: #352f2f;background:repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 50%)calc(var(--s)/2) calc(var(--s)*tan(30deg)/2),repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 50%);background-size: var(--s) calc(var(--s)*tan(30deg));" }).append(
                                        $('<div>', { class: "container" }).append(
                                            boardImage.filter(item => item.name).map(function (item, i) {
                                                return $("<div>", {
                                                    class: "o08 col-xs-12 col-md-4 pa25 df jcsb aife",
                                                }).append(
                                                    $("<img>", {
                                                        src: item.src,
                                                        class: " col-xs-3 tfs11h tpa ttfl td2",
                                                        alt: item.alt,
                                                    }),
                                                    $('<div>', { class: "df col-xs-6 fdc" }).append(
                                                        $('<div>', { class: "fs1 cf ttu df fdc", html: `Quân <span class="db fs3 cf fwb title lh12"> ${item.name} </span>` }),
                                                        $('<div>', { class: "cf text" }).cắtDòng(4, item.desc),

                                                    )
                                                )
                                            })
                                        ),
                                    ),
                                )
                            };
                            header();
                            $.each(
                                {
                                    0: function () {
                                        đầu.sửaLớp("-dn,-pf,-t0,-l0");
                                        TrangChu();
                                        footer.sửaLớp("-dn,df");
                                    },
                                    menu: function () {
                                        var l;
                                        đầu.sửaLớp("-pr,pf,t0,l0");
                                        thân.empty().append(
                                            $('<div>', { class: "wh1 hmnv df jcc aic bgpc bgrr bgsc", style: "background-image: url(/imgs/backgroundMain.png)" }).append(
                                                $("<div>", { class: "pf df fdc z1 wsn hopThongBao", style: "gap: 10px; top:20px; right: 20px;" }),
                                                $("<div>", { id: "menu1", class: "pa50 bra20 df fdc jcc pr", style: "--s: 100px;--c1: #060606;--c2: #2d2727;--c3: #352f2f;background:repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 50%)calc(var(--s)/2) calc(var(--s)*tan(30deg)/2),repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 50%);background-size: var(--s) calc(var(--s)*tan(30deg));" }).append(
                                                    $('<div>', { class: "menuChonVanChoi pa t0 l0 ttx-1 pa10 dn fdc ", style: "--b: 2em; --h: 1em; --p: 50%; --r: 1.2em; --c: #ffffff; border-radius: var(--r)/var(--r) min(var(--r),var(--p) - var(--b)/2) min(var(--r),100% - var(--p) - var(--b)/2) var(--r); clip-path: polygon(100% 100%,0 100%,0 0,100% 0, 100% max(0%,var(--p) - var(--b)/2), calc(100% + var(--h)) var(--p), 100% min(100%,var(--p) + var(--b)/2)); background: var(--c); border-image: conic-gradient(var(--c) 0 0) fill 0/ calc(var(--p) - var(--b)/2) 0 calc(100% - var(--p) - var(--b)/2) var(--r)/ 0 var(--h) 0 0;" }).append(
                                                        $("<div>", {
                                                            class: "fs16 tac fwb c0 title mb15",
                                                            text: "Chọn ván chơi =))",
                                                        }),
                                                        // danh sach van choi
                                                        l = $('<div>', { class: "oys h200 danhSách" }).self("thêm", function (e, r) {
                                                            var t = $(this);
                                                            if (!empty(r)) {

                                                                CẦN.db(idBangDiem + "." + r, function () {
                                                                    var arrTK = (r || []).map(function (á) {
                                                                        return có("à", Jd(config(idBangDiem + "." + á + ".13270796")))
                                                                    });
                                                                    CẦN.db("tàiKhoản." + arrTK, function () {
                                                                        mảng(r).map(function (ir) {
                                                                            var d = config(idBangDiem + "." + ir);
                                                                            cl('13270796', d[13270796])
                                                                            if (!t.children("#" + ir).length)
                                                                                t.empty().append(
                                                                                    $("<div>", {
                                                                                        id: ir,
                                                                                        class: "mb5 df"
                                                                                    }).append(
                                                                                        $('<div>', { class: "fww" }).append(
                                                                                            $("<div>", {
                                                                                                class: "fs10p text",
                                                                                                text: "ID:" + ir,
                                                                                            }),
                                                                                            $("<div>", {
                                                                                                class: "fs14 text",
                                                                                                text: dữLiệu.tên(d[13270796], "à"),
                                                                                            }),
                                                                                        ),
                                                                                        có("à", d[13270796]) !== tôi.lấy("i") && $("<div>", {
                                                                                            class: "bấmĐc ml15 bgcr3 nút title fs1 tac bw2 bbss bbcf bra5 cf plr5 ptb10 chọnVán",
                                                                                            text: "vào",
                                                                                            icon: "meeting_room",
                                                                                        }).on("click", function () {
                                                                                            if (là("U")) {
                                                                                                joinInGame(ir);
                                                                                            } else {
                                                                                                thongBao("warning", "Vui lòng đăng nhập để tham gia ván chơi!");
                                                                                            }
                                                                                        }),

                                                                                    ),
                                                                                )
                                                                        }
                                                                        )
                                                                    })
                                                                })
                                                            } else {
                                                                t.empty().append(
                                                                    bốCục.noPost()
                                                                )
                                                            }
                                                        }).self("làmMới", function () {
                                                            $(this).xửLý("đốiTượng.tải." + idBangDiem, {
                                                                d: {
                                                                    thuộcTính: {
                                                                        13287375: "0",
                                                                        13270645: "_9o1ve", // pending
                                                                        13270797: "",
                                                                    }
                                                                }
                                                            }, { chờ: true },
                                                                function (s) {
                                                                    $(this).trigger("thêm", [s]);
                                                                }
                                                            )
                                                        }).chờGọi("làmMới", 123, false),

                                                        $('<div>', { class: "col-xs-12 df" }).append(
                                                            $("<div>", {
                                                                class: "col-xs-6 bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ptb5 plr15 bgcr4h mr5 wsn",
                                                                text: "Tạo ván chơi",
                                                                icon: "add_circle"
                                                            }).on("click", function () {
                                                                phầnMềm.thôngBáo("đồngÝ", {
                                                                    tiêuĐề: "Tạo 1 ván game mới? ",
                                                                    môTả: "Sẽ tạo 1 ván game mới với chủ host là bạn",
                                                                    đổi: function (ok) {
                                                                        ok && generatorGame()
                                                                    }
                                                                })
                                                            }),
                                                            $("<div>", {
                                                                class: "col-xs-6 bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ptb5 plr15 bgcr4h ml5 wsn",
                                                                text: "tải ván chơi",
                                                                icon: "add_circle"
                                                            }).on("click", function () {
                                                                l.trigger("làmMới");
                                                            }),
                                                        )
                                                    ),
                                                    $("<div>", {
                                                        class: "fs2 tac fwb cf title mb25 ",
                                                        text: "Hi ! Chào Cậu =))",
                                                    }),
                                                    $('<div>', { class: "col-xs-12 df " }).append(
                                                        $("<div>", {
                                                            class: "col-xs-12 bấmĐc wmn2 mb25 bgcr3 nút title fs16 fwb tac bw2 bbss bbcf bra5 bgcrd cf mr5 pa15 wsn người pr",
                                                            text: "đối đầu",
                                                            icon: "view_real_size"
                                                        }).on("click", function () {
                                                            if (là("U")) {
                                                                modeGame = "human";
                                                                $('.máy').sửaLớp("bgcrd");
                                                                $('.người').sửaLớp("-bgcrd");
                                                                $('.độKhó').sửaLớp('vôHiệu');
                                                                $('.menuChonVanChoi').sửaLớp('-dn,df');
                                                                $('.starGame').sửaLớp('vôHiệu'); // Vô hiệu hóa nút Chiến khi chọn mode Online
                                                            } else {
                                                                thongBao("warning", `Đăng nhập đã bạn êu...`);
                                                            }
                                                        }),
                                                        $("<div>", {
                                                            class: "col-xs-12 bấmĐc wmn2 mb25 bgcr3 nút title fs16 fwb tac bw2 bbss bbcf bra5 bgcrd cf ml5 pa15 wsn máy",
                                                            text: "AI",
                                                            icon: "smart_toy"
                                                        }).on("click", function () {
                                                            modeGame = "ai";
                                                            $('.máy').sửaLớp("-bgcrd");
                                                            $('.người').sửaLớp("bgcrd");
                                                            $('.độKhó').sửaLớp('-vôHiệu');
                                                            $('.menuChonVanChoi').sửaLớp('dn,-df');
                                                            $('.starGame').sửaLớp('-vôHiệu'); // Kích hoạt nút Chiến khi chọn mode AI
                                                        }),
                                                    ),
                                                    $('<div>', { class: 'wsn df jcsb aic mb15' }).iRadio({
                                                        chọn: ["Dễ", "Khó", "Siêu Khó"],
                                                        giáTrị: ["easy", "hard", "hardest"],
                                                        cỡ: "fs16",
                                                        loại: "",
                                                        bo: "col-xs-3 mb5 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf pa5 wsn độKhó bgcrd vôHiệu",
                                                        boChọn: "",
                                                        sẵn: true,
                                                        icon: ["sentiment_very_satisfied", "smart_toy", "network_intel_node"],
                                                        ngay: true,
                                                        trống: false,
                                                        đổi: function (v) {
                                                            modeAi = v;
                                                        }
                                                    }),
                                                    $("<div>", {
                                                        class: "col-xs-12 bấmĐc mb25 bgcr3 nút title fs16 fwb tac bw2 bbss bbcf bra5 cf ptb15 bgcr4h starGame vôHiệu",
                                                        text: "Chiến",
                                                        icon: "swords",
                                                    }).on("click", function () {
                                                        là("U") ? vàoURL("/local") : thongBao("error", "Bạn phải đăng nhập để chơi game nhé!");
                                                    }),
                                                    $('<div>', { class: "df col-xs-12" }).append(
                                                        $("<div>", {
                                                            class: "col-xs-4 bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ptb5 bgcr4h",
                                                            text: "Điểm",
                                                            icon: "scoreboard"
                                                        }).on("click", function () {
                                                            var n;
                                                            khung(
                                                                $("<div>", {
                                                                    class: "pa15 df fdc jcc aic col-xs-12",
                                                                }).append(
                                                                    $("<div>", {
                                                                        class: "df jcc aic col-xs-12 fs2 fwb title",
                                                                        text: "Bảng điểm trò chơi"
                                                                    }),
                                                                    n = $('<div>', { class: "oys danhSách hmx5" }).self("bảngĐiểm", function (e, r) {
                                                                        var t = $(this);
                                                                        if (!empty(r)) {

                                                                            CẦN.db(idBangDiem + "." + r, function () {
                                                                                var arrTK = (r || []).map(function (á) {
                                                                                    return có("à", Jd(config(idBangDiem + "." + á + ".13270796")))
                                                                                });
                                                                                CẦN.db("tàiKhoản." + arrTK, function () {
                                                                                    mảng(r).map(function (á, à) {
                                                                                        var d = config(idBangDiem + "." + á) || {};
                                                                                        if (!t.children("#" + á).length)
                                                                                            t.empty().append($('<div>', { class: "col-xs-12" }).append(
                                                                                                $('<div>', { class: "col-xs-12 fs10p text", text: "ID: " + d.i }),
                                                                                                $('<div>', { class: "col-xs-12" }).append(
                                                                                                    d[13270796] && $('<div>', { class: "" }).append(
                                                                                                        $('<div>', { class: "fs14 text fwb", html: dữLiệu.tên(có("à", d[13270796]), "à") })
                                                                                                    )
                                                                                                )
                                                                                            ))
                                                                                    })
                                                                                })
                                                                            })
                                                                        } else {
                                                                            t.empty().append(
                                                                                bốCục.noPost()
                                                                            )
                                                                        }


                                                                    }).self("làmMớiBảngĐiểm", function () {
                                                                        $(this).xửLý("đốiTượng.tải." + idBangDiem, {
                                                                            d: {
                                                                                thuộcTính: {
                                                                                    13287375: "1",
                                                                                }
                                                                            }
                                                                        }, { chờ: true },
                                                                            function (s) {
                                                                                $(this).trigger("bảngĐiểm", [s]);
                                                                            }
                                                                        )
                                                                    }).chờGọi("làmMớiBảngĐiểm", 123, false),

                                                                    $("<div>", {
                                                                        class: "col-xs-6 bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ptb5 plr15 bgcr4h ml5 wsn",
                                                                        text: "Tải bảng điểm",
                                                                        icon: "add_circle"
                                                                    }).on("click", function () {
                                                                        n.trigger("làmMớiBảngĐiểm");
                                                                    }),
                                                                ),
                                                                "__khung",
                                                                {
                                                                    tiêuĐề:
                                                                        "Bảng điểm",
                                                                    ngoài: "",
                                                                    trong: "col-xs-3",
                                                                    koTắt: false,
                                                                    onShow: function () { },
                                                                    onHide: function () { },
                                                                }
                                                            )
                                                        }),
                                                        $("<a>", {
                                                            class: "col-xs-4 bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ml5 ptb5 bgcr4h",
                                                            text: "Trở về",
                                                            icon: "door_open",
                                                            href: "/"
                                                        }).tip("Sợ rồi à?"),
                                                        $("<div>", {
                                                            class: "col-xs-4 bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ml5 ptb5 bgcr4h",
                                                            text: "Cài đặt",
                                                            icon: "settings"
                                                        }).on("click", function () {
                                                            $(this).append(setting())
                                                        }),
                                                    ),
                                                )
                                            )
                                        )
                                    },
                                    // Thay thế phần giao diện game trong hàm menu bằng code mới này
                                    local: function () {
                                        // Mode AI: Chạy game ngay
                                        modeGame = "ai"; // Đảm bảo mode là AI
                                        đầu.sửaLớp("-pr,pf,t0,l0");
                                        thân.empty().append(
                                            $('<div>', { class: "wh1 hmnv df jcc aic bgpc bgrr bgsc", style: "background-image: url(/imgs/backgroundMain.png)" }).append(
                                                $("<div>", { class: "pf df fdc z1 wsn hopThongBao", style: "gap: 10px; top:20px; right: 20px;" }),
                                                $("<div>", {
                                                    id: "game",
                                                    class: "w1", // Hiển thị game ngay
                                                    style: "gap: 20px"
                                                }).append(
                                                    $('<div>', { class: "container df jcsb" }).append(
                                                        $('<div>', { class: "col-xs-8 df fdc jcc aic" }).append(
                                                            $('<div>', { class: "col-xs-12 bra10 pa5 df aic mb5", style: "--s: 45px;--c1: #060606;--c2: #2d2727;--c3: #352f2f;background:repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 50%)calc(var(--s)/2) calc(var(--s)*tan(30deg)/2),repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 50%);background-size: var(--s) calc(var(--s)*tan(30deg));" }).append(
                                                                $('<div>', { class: "bra10 wh32 bgsc bgpc bgrn", style: "background-image: url(/imgs/BOT.png)" }),
                                                                $('<div>', { class: "ml15" }).append(
                                                                    $('<div>', { class: "fwb cf fs11 text blackPlayerName" }),
                                                                    $("<div>", {
                                                                        id: "blackTimer",
                                                                        class: "cf fwb fs11 text",
                                                                        text: "10:00",
                                                                    }),
                                                                ),
                                                                $("<div>", {
                                                                    id: "blackCaptured",
                                                                    class: "df fww ",
                                                                }),
                                                            ),
                                                            $("<div>", {
                                                                id: "chessboard",
                                                                class: "col-xs-12 col-md-8 jcc fww",
                                                            }),
                                                            $('<div>', { class: "col-xs-12 bra10 pa5 df aic mt5", style: "--s: 45px;--c1: #060606;--c2: #2d2727;--c3: #352f2f;background:repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 50%)calc(var(--s)/2) calc(var(--s)*tan(30deg)/2),repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 50%);background-size: var(--s) calc(var(--s)*tan(30deg));" }).append(
                                                                $('<div>', { class: "bra10 wh32 bgsc bgpc bgrn" }).ảnh(tôi.lấy("i"), "à", true),
                                                                $('<div>', { class: "ml15" }).append(
                                                                    $('<div>', { class: "fwb cf fs11 text whitePlayerName" }),
                                                                    $("<div>", {
                                                                        id: "whiteTimer",
                                                                        class: "cf fwb fs11 text",
                                                                        text: "10:00",
                                                                    }),
                                                                ),
                                                                $("<div>", {
                                                                    id: "whiteCaptured",
                                                                    class: "df fww ",
                                                                }),
                                                            ),
                                                        ),
                                                        $('<div>', { class: "col-xs-2 bra20 plr25 ptb10 df jcsb fdc", style: "--s: 50px; /* control the size*/ --c1: #f2f2f2; --c2: #cdcbcc; --c3: #c3c3c3; --_g: 0 120deg,#0000 0; background: conic-gradient(at calc(250%/3) calc(100%/3),var(--c3) var(--_g)), conic-gradient(from -120deg at calc( 50%/3) calc(100%/3),var(--c2) var(--_g)), conic-gradient(from  120deg at calc(100%/3) calc(250%/3),var(--c1) var(--_g)), conic-gradient(from  120deg at calc(200%/3) calc(250%/3),var(--c1) var(--_g)), conic-gradient(from -180deg at calc(100%/3) 50%,var(--c2)  60deg,var(--c1) var(--_g)), conic-gradient(from   60deg at calc(200%/3) 50%,var(--c1)  60deg,var(--c3) var(--_g)), conic-gradient(from  -60deg at 50% calc(100%/3),var(--c1) 120deg,var(--c2) 0 240deg,var(--c3) 0); background-size: calc(var(--s)*sqrt(3)) var(--s);" }).append(
                                                            $('<div>', { class: "df fdc moves h200 oys" }).append(
                                                                $('<div>', { class: "title fs14 fwb c0 mb15", text: "Các nước đã đi" })
                                                            ),
                                                            $("<div>", { class: "df jcc aic fdc" }).append(
                                                                $("<div>", {
                                                                    class: "bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf plr15 ptb5 wsn w1 mb15",
                                                                    text: "Thoát",
                                                                    icon: "arrow_circle_left"
                                                                }).tip("Trốn").on("click", function () {
                                                                    phầnMềm.thôngBáo("đồngÝ", {
                                                                        tiêuĐề: "Trở về menu? ",
                                                                        môTả: "Trở về 1 cái là xoá game đó nhá =))",
                                                                        đổi: function (ok) {
                                                                            if (ok) {
                                                                                vàoURL("/menu");
                                                                                stopGame()
                                                                            }
                                                                        }
                                                                    })
                                                                }),
                                                                $("<div>", {
                                                                    class: "bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf plr15 ptb5 wsn w1 mb15",
                                                                    text: "Reset Game",
                                                                    icon: "restart_alt"
                                                                }).tip("Chơi mà chơi reset =))").on("click", function () {
                                                                    phầnMềm.thôngBáo("đồngÝ", {
                                                                        tiêuĐề: "Reset lại game nhá? ",
                                                                        môTả: "Reset lại game để chơi ván mới đê, ván cũ khó quá rùi =((",
                                                                        đổi: function (ok) {
                                                                            ok && resetGame();
                                                                        }
                                                                    })
                                                                }),
                                                                $("<div>", {
                                                                    id: "btnUnMove",
                                                                    class: "bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf plr15 ptb5 wsn w1 mb15",
                                                                    text: "Hoàn tác",
                                                                    icon: "undo"
                                                                }).on("click", function () {
                                                                    undoLastMove();
                                                                }),
                                                                $("<div>", {
                                                                    class: "bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf plr15 ptb5 wsn w1 mb15",
                                                                    text: "Cài đặt",
                                                                    icon: "settings"
                                                                }).on("click", function () {
                                                                    setting()
                                                                }),
                                                            ),
                                                        ),
                                                    )
                                                )
                                            )
                                        );
                                        startGame();
                                    },
                                    online: function (id) {
                                        CẦN.db(data.idBangDiem + "." + id, function (s) {
                                            statusEndGame = s[13287375];
                                            if (!là("U") || statusEndGame === "1") {
                                                vàoURL("/menu");
                                                return;
                                            } else {
                                                idGame = id;
                                                modeGame = "human";
                                                đầu.sửaLớp("-pr,pf,t0,l0");
                                                thân.empty().append(
                                                    $('<div>', { class: "wh1 hmnv df jcc aic bgpc bgrr bgsc", style: "background-image: url(/imgs/backgroundMain.png)" }).append(
                                                        $("<div>", { class: "pf df fdc z1 wsn hopThongBao", style: "gap: 10px; top:20px; right: 20px;" }),
                                                        $("<div>", {
                                                            id: "game",
                                                            class: "w1",
                                                            style: "gap: 20px"
                                                        }).append(
                                                            $('<div>', { class: "container df jcsb" }).append(
                                                                $('<div>', { class: "col-xs-8 df fdc jcc aic" }).append(
                                                                    $('<div>', { class: "col-xs-12 bra10 pa5 df aic mb5", style: "--s: 45px;--c1: #060606;--c2: #2d2727;--c3: #352f2f;background:repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 50%)calc(var(--s)/2) calc(var(--s)*tan(30deg)/2),repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 50%);background-size: var(--s) calc(var(--s)*tan(30deg));" }).append(
                                                                        $('<div>', { class: "bra10 wh32 bgsc bgpc bgrn avataBlackPlayer" }),
                                                                        $('<div>', { class: "ml15" }).append(
                                                                            $('<div>', { class: "fwb cf fs11 text blackPlayerName" }),
                                                                            $("<div>", {
                                                                                id: "blackTimer",
                                                                                class: "cf fwb fs11 text",
                                                                                text: "10:00",
                                                                            })
                                                                        ),
                                                                        $("<div>", {
                                                                            id: "blackCaptured",
                                                                            class: "df fww",
                                                                        })
                                                                    ),
                                                                    $("<div>", {
                                                                        id: "chessboard",
                                                                        class: "col-xs-12 col-md-8 jcc fww",
                                                                    }),
                                                                    $('<div>', { class: "col-xs-12 bra10 pa5 df aic mt5", style: "--s: 45px;--c1: #060606;--c2: #2d2727;--c3: #352f2f;background:repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 50%)calc(var(--s)/2) calc(var(--s)*tan(30deg)/2),repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 50%);background-size: var(--s) calc(var(--s)*tan(30deg));" }).append(
                                                                        $('<div>', { class: "bra10 wh32 bgsc bgpc bgrn avataWhitePlayer" }),
                                                                        $('<div>', { class: "ml15" }).append(
                                                                            $('<div>', { class: "fwb cf fs11 text whitePlayerName" }),
                                                                            $("<div>", {
                                                                                id: "whiteTimer",
                                                                                class: "cf fwb fs11 text",
                                                                                text: "10:00",
                                                                            })
                                                                        ),
                                                                        $("<div>", {
                                                                            id: "whiteCaptured",
                                                                            class: "df fww",
                                                                        })
                                                                    )
                                                                ),
                                                                $('<div>', { class: "col-xs-2 bra20 plr25 ptb10 df jcsb fdc", style: "--s: 50px;--c1: #f2f2f2; --c2: #cdcbcc; --c3: #999999; --_g: 0 120deg,#0000 0; background: conic-gradient( at calc(250%/3) calc(100%/3),var(--c3) var(--_g)), conic-gradient(from -120deg at calc( 50%/3) calc(100%/3),var(--c2) var(--_g)), conic-gradient(from 120deg at calc(100%/3) calc(250%/3),var(--c1) var(--_g)), conic-gradient(from 120deg at calc(200%/3) calc(250%/3),var(--c1) var(--_g)), conic-gradient(from -180deg at calc(100%/3) 50%,var(--c2) 60deg,var(--c1) var(--_g)), conic-gradient(from 60deg at calc(200%/3) 50%,var(--c1) 60deg,var(--c3) var(--_g)), conic-gradient(from -60deg at 50% calc(100%/3),var(--c1) 120deg,var(--c2) 0 240deg,var(--c3) 0); background-size: calc(var(--s)*sqrt(3)) var(--s);" }).append(
                                                                    $('<div>', { class: "oys h400 moves" }),
                                                                    $('<div>', { class: "df fdc" }).append(
                                                                        $("<div>", {
                                                                            class: "bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ptb5 plr15 mb5 đầuHàng",
                                                                            text: "Đầu hàng",
                                                                            icon: "flag"
                                                                        }).on("click", function () {
                                                                            phầnMềm.thôngBáo("đồngÝ", {
                                                                                tiêuĐề: "Bạn muốn đầu hàng?",
                                                                                môTả: "Đầu hàng sẽ kết thúc ván chơi và đối thủ thắng.",
                                                                                đổi: function (ok) {
                                                                                    if (ok) surrenderGame();
                                                                                }
                                                                            });
                                                                        }),
                                                                        $("<div>", {
                                                                            class: "bấmĐc bgcr3 nút title fs1 fwb tac bw2 bbss bbcf bra5 cf ptb5 plr15 mb5",
                                                                            text: "Thoát",
                                                                            icon: "logout"
                                                                        }).on("click", function () {
                                                                            phầnMềm.thôngBáo("đồngÝ", {
                                                                                tiêuĐề: "Thoát ván chơi?",
                                                                                môTả: "Thoát sẽ kết thúc ván chơi hiện tại.",
                                                                                đổi: function (ok) {
                                                                                    if (ok) {
                                                                                        stopGame();
                                                                                        vàoURL("/menu");
                                                                                    }
                                                                                }
                                                                            });
                                                                        })
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                );
                                                startGame();
                                            }
                                        })
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
        },
    });
});
