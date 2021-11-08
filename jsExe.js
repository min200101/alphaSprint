class tankFactory{
    //电脑方坦克有以下三种：
    //第一个关卡的电脑方坦克数量为20，每过一关，电脑方坦克数量增加1辆，重型坦克的比例提高。
    create_QuickTank(){}
    //快速坦克：行驶速度比玩家的坦克快，但自身防御力低，可被玩家坦克一炮击毁；
    create_HeavyTank(){}
    //重型坦克：行驶速度慢，装甲厚，需要三发炮弹才能击毁；
    create_CommonTank(){}
    //普通坦克：行驶速度和防御能力介于以上两者之间，需要二发炮弹才能击毁。


    //玩家坦克
    create_PlayerTank(){}
    //每一关卡，每位玩家的坦克数量均为3辆；被击毁一辆，才能再产生一辆。
}


class tank {
    constructor(x,y,moveToBase){
            this.dirc=`top`;
            this.tank=document.createElement('div');
            this.tank.className += 'tank';
            this.tank.style.left=`${x}px`;
            this.tank.style.top=`${y}px`;
            document.querySelector('.map').appendChild(this.tank);
            this.canShot=true;
            this.flag=1;  //1代表敌方坦克，0代表玩家坦克;
            
            this.name  //用于生成坦克上方的名称

            this.interval;
            this.rebirth=2;
        // 创建坦克

            setTimeout( () =>{
                this.rebirth=4
            },moveToBase)
    }

    move(dirc){
        let numX=this.tank.offsetLeft;
        let numY=this.tank.offsetTop;
        this.dirc=dirc;
        switch (dirc){
            case 'left':
                this.tank.style.transform="rotate(-90deg)";
                if(numX<=this.speed) return false;
                if(myMap.isEmpty(numX-this.speed,numY,'tank')==true ){
                    this.tank.style.left=`${numX-this.speed}px`;   
                    this.name.tankName.style.left=`${numX-this.speed}px`
                }
                break;

            case 'right':
                this.tank.style.transform = "rotate(90deg)";
                if(numX>=960) return false;
                if(myMap.isEmpty(numX+this.speed,numY,'tank')==true ){
                    this.tank.style.left=`${numX+this.speed}px`
                    this.name.tankName.style.left=`${numX+this.speed}px`

                }

                break;


            case 'top':
                this.tank.style.transform = "rotate(0deg)";
                if (numY <= this.speed) return false;
                if (myMap.isEmpty(numX,numY-this.speed,'tank')==true) {
                    this.tank.style.top = `${numY-this.speed}px`;
                    this.name.tankName.style.top=`${numY-this.speed-15}px`
                }

                break;

            case 'bottom':
                this.tank.style.transform = "rotate(180deg)";
                if (numY >= 610) return false;
                if (myMap.isEmpty(numX,numY+this.speed,'tank')==true) {
                    this.tank.style.top = `${numY+this.speed}px`;
                    this.name.tankName.style.top=`${numY+this.speed-15}px`
                }
                break;
        }
    }

    fire(){
        if(!this.canShot) return;

        this.canShot=false;
        new Bullet(this.dirc, this.tank.offsetLeft,this.tank.offsetTop,this);
    }

    beFired(){
        if(this.life==2){
            this.ruin();
        }

        let rate=this.life/this.wholeLife;
        this.tank.style.opacity = `${rate}`
        this.life--;
    
    }

    ruin(){
        if(this.life>1){
            this.life=this.life-1;
            return false;
        }

        document.querySelector('.map').removeChild(this.name.tankName)
        document.querySelector('.map').removeChild(this.tank);
        enermy.removeSet(this)
    }

}

//model:  1 表示简单模式 2表示普通模式 3表示困难模式
//level:  1-5表示关数

class quickTank extends tank{
    constructor(x,y,model,level,moveToBase){
        super(x,y,moveToBase);
        this.speed=2+model+level  //快速坦克速度设置为7
        this.life=1   //快速坦克可被一炮毙命;
        this.tank.className+=' quickTank'
        this.name = new tankName (x, y-15,'random')
    }
}

class heavyTank extends tank{
    constructor(x,y,model,level,moveToBase){
        super(x,y,moveToBase);
        this.speed=0+model+level;   //重型坦克速度设置为3
        this.life=3;  //重型坦克有三条命
        this.tank.className+=' heavryTank'
        this.name = new tankName (x, y-15,'random')
    }
}

class commonTank extends tank{
    constructor(x,y,model,level,moveToBase){
        super(x,y,moveToBase);
        this.speed=1+model+level ;  //普通坦克速度为5
        this.life=2;    //普通坦克生命为2
        this.tank.className+=' commonTank'

        this.name = new tankName (x, y-15,'random')
    }
}


class playerTank extends tank{
    constructor(x,y){
        super(x,y);
        // this.speed=level+model;
        this.tank.className+=' playerTank'
        this.speed=7;
        this.flag=0;   //把flag改成为1
        this.life=3;

        this.name= new tankName(x,y-15,'player');
    }

}


class quickTankFactory extends tankFactory{
    create_QuickTank(x,y,model,level){
        return new quickTank(x,y,model,level,moveToBase);
    }
}

class heavryTankFactory extends tankFactory{
    create_HeavryTank(x,y,model,level){
        return new heavyTank(x,y,model,level,moveToBase);
    }
}

class commonTankFactory extends tankFactory{
    create_CommonTank(x,y,model,level){
        return (new commonTank(x,y,model,level,moveToBase));
    }
}

class playerTankFactory extends tankFactory{
    create_PlayerTank(x,y,model,level){
        return (new playerTank(x,y,model,level,moveToBase));
    }
}







