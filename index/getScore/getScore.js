class Score{
    constructor(score){
        this.score = score
    }
    _Score(){
        let _score = this.score.toString(),
            scoreArray = _score.split('.'),
            fullStar = parseInt(scoreArray[0]),
            halfStar = parseInt(scoreArray[1])>5?1:0,
            zeroStar = 5-fullStar-halfStar,
            starStr = '',
            scoreStr = ''

        for(let i = 0;i<fullStar;i++){
            starStr+='<div class="star fullStar"><i class="iconfont icon-pingfenshoucang-"></i></div>'
        }

        for (let j = 0; j < halfStar; j++) {
            starStr+='<div class="star halfStar"><i class="iconfont icon-unie615"></i></div>';
        }

        for (let k = 0; k < zeroStar; k++) {
            starStr+='<div class="star zeroStar"><i class="iconfont icon-pingfen"></i></div>';
        }

        return  scoreStr=`<div class="star">${starStr}</div>`;

    }
}
