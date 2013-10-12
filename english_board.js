var img_dir = "img";
var audio_dir = "audio";

var audioRead =[
	new Audio(audio_dir + "/dog.mp3"), 
	new Audio(audio_dir + "/cat.mp3"), 
	new Audio(audio_dir + "/elephant.mp3"), 
	new Audio(audio_dir + "/monkey.mp3"), 
	new Audio(audio_dir + "/giraffe.mp3"), 
	new Audio(audio_dir + "/sheep.mp3")
];

var audioQuiz = [
	new Audio(audio_dir + "/which_dog.mp3"), 
	new Audio(audio_dir + "/which_cat.mp3"), 
	new Audio(audio_dir + "/which_elephant.mp3"), 
	new Audio(audio_dir + "/which_monkey.mp3"), 
	new Audio(audio_dir + "/which_giraffe.mp3"), 
	new Audio(audio_dir + "/which_sheep.mp3")
];

var images = [
	img_dir + "/dog.png",
	img_dir + "/cat.jpg",
	img_dir + "/elephant.jpg",
	img_dir + "/monkey.jpg",
	img_dir + "/giraffe.jpg",
	img_dir + "/sheep.jpg"
];

var images_ok = [
	img_dir + "/dog_ok.png",
	img_dir + "/cat_ok.jpg",
	img_dir + "/elephant_ok.jpg",
	img_dir + "/monkey_ok.jpg",
	img_dir + "/giraffe_ok.jpg",
	img_dir + "/sheep_ok.jpg"
];

var images_ng = [
	img_dir + "/dog_ng.png",
	img_dir + "/cat_ng.jpg",
	img_dir + "/elephant_ng.jpg",
	img_dir + "/monkey_ng.jpg",
	img_dir + "/giraffe_ng.jpg",
	img_dir + "/sheep_ng.jpg"
];

var audio_ok = new Audio(audio_dir + "/ok.mp3");
var audio_no = new Audio(audio_dir + "/no.mp3");

// 読み上げモード（read）か、クイズモード（quiz）か
var current_mode = "read";

// クイズモードの際の出題中のもの
var current_quiz_ind;

// 前回選ばれた画像
var last_selected_img_ind = -1;

// 次のクイズに移るためのタイマー
var timer_next_quiz;

function play(audio) {
	audio.play();
}

// クイズモードに切り替える
function quizmode() {
	current_mode = "quiz";

	// 前回選ばれていた画像を初期化
	if (last_selected_img_ind >= 0) {
		drawImage(last_selected_img_ind);
		last_selected_img_ind = -1;
	}

	var e_mode_font_1 = document.getElementById("mode_font_1");
	e_mode_font_1.style.border = "0px";
	var e_mode_font_2 = document.getElementById("mode_font_2");
	e_mode_font_2.style.border = "6px #FF0000 solid";
	var e_font_quiz = document.getElementById("font_quiz");
	
	var word_list = ['dog', 'cat', 'elephant', 'monkey', 'giraffe', 'sheep'];
	var ind = Math.floor(Math.random() * word_list.length);
	
	current_quiz_ind = ind;
	setText(e_font_quiz, 'Which is ' + word_list[ind] + '?');
	audioQuiz[ind].play();
}

// 単語読み上げモードに切り替える
function readmode() {
	current_mode = "read";

	// 前回選ばれていた画像を初期化
	if (last_selected_img_ind >= 0) {
		drawImage(last_selected_img_ind);
		last_selected_img_ind = -1;
	}

	var e_mode_font_1 = document.getElementById("mode_font_1");
	e_mode_font_1.style.border = "6px #FF0000 solid";
	var e_mode_font_2 = document.getElementById("mode_font_2");
	e_mode_font_2.style.border = "0px";
	var e_font_quiz = document.getElementById("font_quiz");
	setText(e_font_quiz, '');
}

// タイマー処理中に使うカウンタ
var ind_go_next;

// 写真がクリックされたときに呼び出される関数
// ind: どの写真がクリックされたか
function clickPhoto(ind) {

	if (current_mode == "read") {
		audioRead[ind].play();
	}
	else {
		// 前回選ばれていた画像を初期化
		if (last_selected_img_ind >= 0 && last_selected_img_ind != ind) {
			drawImage(last_selected_img_ind);
		}
		last_selected_img_ind = ind;
		
		if (ind == current_quiz_ind) {
			audio_ok.play();
			drawOK(ind);
			ind_go_next = 0;
			var func_ref = function() {
				if (ind_go_next >= 2) {
					clearInterval(timer_next_quiz);
					quizmode();
				}
				else {
					ind_go_next++;
				}
			}
			// clearInterval(timer_next_quiz);
			// timer_next_quiz = setInterval(func_ref, 500);
		}
		else {
			audio_no.play();
			drawNG(ind);
		}
	}
}

// 写真上に○を描画する関数
// ind: 描画対象
function drawOK(ind) {
	var canvas = document.getElementById('maincanvas');
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = "#FF0000";
	ctx.lineWidth = 10;
	ctx.beginPath();

	if (ind == 0) {
		ctx.arc(125, 90, 80, 0, Math.PI*2, false);
	}
	if (ind == 1) {
		ctx.arc(385, 90, 80, 0, Math.PI*2, false);
	}
	if (ind == 2) {
		ctx.arc(645, 90, 70, 0, Math.PI*2, false);
	}
	if (ind == 3) {
		ctx.arc(100, 400, 80, 0, Math.PI*2, false);
	}
	if (ind == 4) {
		ctx.arc(360, 400, 80, 0, Math.PI*2, false);
	}
	if (ind == 5) {
		ctx.arc(645, 400, 80, 0, Math.PI*2, false);
	}
	ctx.stroke();
}

// 写真上に×を描画する関数
// ind: 描画対象
function drawNG(ind) {
	var canvas = document.getElementById('maincanvas');
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = "#0000FF";
	ctx.lineWidth = 10;
	ctx.beginPath();
	
	if (ind == 0) {
		ctx.moveTo(45, 10);
		ctx.lineTo(205, 170);
		ctx.moveTo(205, 10);
		ctx.lineTo(45, 170);
	}
	if (ind == 1) {
		ctx.moveTo(305, 10);
		ctx.lineTo(465, 170);
		ctx.moveTo(465, 10);
		ctx.lineTo(305, 170);
	}
	if (ind == 2) {
		ctx.moveTo(575, 20);
		ctx.lineTo(715, 160);
		ctx.moveTo(715, 20);
		ctx.lineTo(575, 160);
	}
	if (ind == 3) {
		ctx.moveTo(20, 320);
		ctx.lineTo(180, 480);
		ctx.moveTo(180, 320);
		ctx.lineTo(20, 480);
	}
	if (ind == 4) {
		ctx.moveTo(280, 320);
		ctx.lineTo(440, 480);
		ctx.moveTo(440, 320);
		ctx.lineTo(280, 480);
	}
	if (ind == 5) {
		ctx.moveTo(565, 320);
		ctx.lineTo(725, 480);
		ctx.moveTo(725, 320);
		ctx.lineTo(565, 480);
	}

	ctx.stroke();
}

// HTML要素に文字をセットする
function setText(e, str) {
  e.innerText = str;
  e.textContent = str;
}

var mouseX;
var mouseY;

// ページが読み込まれたときの初期化
function init() {
	initCanvas();
	
	var canvas = document.getElementById('maincanvas');
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var ctx = canvas.getContext('2d');
	
	canvas.onmousedown = mouseDownListener;
	
	function mouseDownListener(e) {
		adjustXY(e);
		if (mouseX <= 250 && mouseY<=185) {
			clickPhoto(0);
		}
		if (mouseX >= 260 && mouseX <= 510 && mouseY <= 185) {
			clickPhoto(1);
		}
		if (mouseX >= 520 && mouseX <= 770 && mouseY <= 185) {
			clickPhoto(2);
		}
		if (mouseX <= 200 && mouseY >= 250 && mouseY <= 551) {
			clickPhoto(3);
		}
		if (mouseX >= 260 && mouseX <= 460 && mouseY >= 250 && mouseY <= 551) {
			clickPhoto(4);
		}
		if (mouseX >= 520 && mouseX <= 770 && mouseY >= 280 && mouseY <= 530) {
			clickPhoto(5);
		}
	}
	
	function adjustXY(e) {
		var rect = e.target.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}
}

// キャンバスを初期化
function initCanvas() {
	var canvas = document.getElementById('maincanvas');
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var ctx = canvas.getContext('2d');
	
	drawImage(0);
	drawImage(1);
	drawImage(2);
	drawImage(3);
	drawImage(4);
	drawImage(5);
	
}

// 写真を描画
// ind: 描画対象
function drawImage(ind) {
	var canvas = document.getElementById('maincanvas');
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var ctx = canvas.getContext('2d');

	if (ind == 0) {
		var img_dog = new Image();
		img_dog.src = img_dir + "/dog.png?" + new Date().getTime();
		img_dog.onload = function() {
			ctx.drawImage(img_dog, 0, 0);
		}
	}
	if (ind == 1) {
		var img_cat = new Image();
		img_cat.src = img_dir + "//cat.jpg?" + new Date().getTime();
		img_cat.onload = function() {
			ctx.drawImage(img_cat, 260, 0);
		}
	}
	if (ind == 2) {
		var img_elephant = new Image();
		img_elephant.src = img_dir + "/elephant.jpg?" + new Date().getTime();
		img_elephant.onload = function() {
			ctx.drawImage(img_elephant, 520, 7);
		}
	}
	if (ind == 3) {
		var img_monkey = new Image();
		img_monkey.src = img_dir + "/monkey.jpg?" + new Date().getTime();
		img_monkey.onload = function() {
			ctx.drawImage(img_monkey, 0, 250);
		}
	}
	if (ind == 4) {
		var img_giraffe = new Image();
		img_giraffe.src = img_dir + "/giraffe.jpg?" + new Date().getTime();
		img_giraffe.onload = function() {
			ctx.drawImage(img_giraffe, 260, 250);
		}
	}
	if (ind == 5) {
		var img_sheep = new Image();
		img_sheep.src = img_dir + "/sheep.jpg?" + new Date().getTime();

		img_sheep.onload = function() {
			ctx.drawImage(img_sheep, 520, 280);
		}
	}
}

