<template>
    <div class="setting-container" :class="{fixed: fixed}">
        <div class="wrap" ref='wrap'>
            <img src="../../assets/images/style3.png" alt="" class="background" ref="bigMoban" >
            <img :src="avatar" alt="" class="avatar" 
            @touchstart.prevent="touchstart($event)" 
            @touchmove.prevent="touchmove($event)" 
            @touchend.prevent="touchend($event)" 
            ref='avatar'>
        </div>
        <input type="file" name="pic" id="pic" accept='image/gif,image/jpeg,image/jpg,image/png' 
        @change='changeImage($event)' style="float: left;width: 200px ">
        <button @click="createP" style="float: right; background: #ddd">生成海报到相册</button>
    </div>
</template>
<script>
import html2Canvas from 'html2canvas';
export default {
    data(){
        return {
            avatar: require("../../assets/images/下载.png"),
            start: {
                x: 0,
                y: 0
            },
            move: {
                x: 0,
                y: 0
            },
            scaleStart: {
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0
            },
            scaleMove: {
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0
            },
            touchTimes: 0,
            fixed: false, // 当移动放大图片时将最外层dom改为position：fixed，防止其他元素一起移动
            scrollTop: ''  // 当最外层为fixe时  将当前滚动条高度转为top高度
        }

    },
    methods: {
        changeImage(e){
            var file = e.target.files[0]
            var reader = new FileReader()
            var that = this
            reader.readAsDataURL(file)
            reader.onload = function(e){
                that.avatar = this.result
            }
        },
        touchstart: function (e) {
            // this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop   
            // console.log('top=>', this.scrollTop )
            this.fixed = true
            let event = window.event || e;
            let _this = this;
            this.touchTimes++;
            // 双击时放大50
            let timesFun = setTimeout(function () {
                // 如果大于1，说明是双击图片
                if (_this.touchTimes > 1) {
                    event.touches[0].target.width += 50;
                }
                // 清除定时
                clearInterval(timesFun);
                _this.touchTimes = 0;
            }, 300);
            // 初始多个触摸位置（进行放大缩小）
            if (event.touches.length > 1) {
                this.scaleStart = {
                    x0: event.touches[0].clientX,
                    y0: event.touches[0].clientY,
                    x1: event.touches[1].clientX,
                    y1: event.touches[1].clientY
                };
            } else if (event.touches.length === 1) {
                // 初始单个触摸位置
                this.start = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };
            }
        },
        touchmove: function (e) {
            this.touchTimes = 0;
            let event = window.event || e;
            // 如果是1个触摸点，只计算上下左右移动
            if (event.touches.length === 1) {
                this.move.x += event.touches[0].clientX - this.start.x;
                this.move.y += event.touches[0].clientY - this.start.y;
                // event.touches[0].target.style.transform = `translate3d(${this.move.x}px, ${this.move.y}px, 0px) translateZ(0px)`;
                event.touches[0].target.style.top = `${this.move.y}px`;
                event.touches[0].target.style.left = `${this.move.x}px`;

                this.start = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };
            } else if (event.touches.length === 2) { // 如果是2个触摸点，计算放大还是缩小
                // 触摸移动位置
                this.scaleMove = {
                    x0: event.touches[0].pageX,
                    y0: event.touches[0].pageY,
                    x1: event.touches[1].pageX,
                    y1: event.touches[1].pageY
                };
                /*
                    * 计算触摸点差值
                    * */
                // 初始2个触摸点
                const diffXInit = Math.abs(this.scaleStart.x0 - this.scaleStart.x1);
                const diffYInit = Math.abs(this.scaleStart.y0 - this.scaleStart.y1);
                const diffX = Math.abs(this.scaleMove.x0 - this.scaleMove.x1);
                const diffY = Math.abs(this.scaleMove.y0 - this.scaleMove.y1);
                /*
                    * 判断是左右、还是上下滑动来放大缩小
                    * */
                // 左右移动触摸
                if (Math.abs(this.scaleStart.x0 - this.scaleMove.x0) > Math.abs(this.scaleStart.y0 - this.scaleMove.y0)) {
                    // 比较touch开始与移动时的差，计算出是缩小还是放大
                    if (diffX > diffXInit) { // 放大
                        event.touches[0].target.width += Math.abs(diffXInit - diffX);
                        console.log('左右放大');
                    } else { // 缩小
                        event.touches[0].target.width -= Math.abs(diffXInit - diffX);
                        console.log('左右缩小');
                    }
                } else { // 上下移动触摸
                    // 比较触摸开始与移动时的差，计算出是缩小还是放大
                    if (diffY > diffYInit) { // 放大
                        event.touches[0].target.width += Math.abs(diffYInit - diffY);
                        console.log('上下放大');
                    } else { // 缩小
                        event.touches[0].target.width -= Math.abs(diffYInit - diffY);
                        console.log('上下缩小');
                    }
                }
                // 重置触摸位置
                this.scaleStart = {
                    x0: event.touches[0].clientX,
                    y0: event.touches[0].clientY,
                    x1: event.touches[1].clientX,
                    y1: event.touches[1].clientY
                };
            }
        },
        touchend: function (e) {
            let event = window.event || e;
            // 如果触摸点变为1个时（就像2个触摸点，松开了1个），重置初始触摸点
            if (event.touches.length > 0) {
                this.start = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };
            }
            this.fixed = false
            let vm = this
            setTimeout(function(){  // 需要加个定时器才能保证滚动到触摸前的位置，我估计是因为改变了最外层class
                window.scrollTo(0, vm.scrollTop)
                console.log(vm.scrollTop)
                vm.scrollTop = ''
            },1)
        },
        createP (){
            var wm = this
            var c = document.createElement("canvas")
            c.width = this.$refs.wrap.width * 2
            c.height = this.$refs.wrap.height * 2
            var opts = {
                scale: 2,
                canvas: c,
                logging: true,
                width: this.$refs.wrap.width,
                height: this.$refs.wrap.height,
                taintTest: false,
                useCORS: true,
                allowTaint: false,
                backgroundColor: null
            }
            html2Canvas(this.$refs.wrap,opts).then(function(canvas){
                console.log('canvas======done')
                let imgUrl = canvas.toDataURL('image/jpeg',1.0)
                console.log("canvas:imgUrl=====",imgUrl)
                location.href = imgUrl
            }
            )
        }
    }
}
</script>
<style lang="less" scoped>
.setting-container {
    .wrap {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 550px;
    }
    .avatar {
        position: absolute;
        top: 80px;
        left: 60px;
        transform: rotate(-3deg);
    }
    .background {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }
}


</style>
