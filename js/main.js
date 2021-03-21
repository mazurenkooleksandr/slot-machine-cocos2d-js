cc.game.onStart = function(){
  let iconsPlist = ["img/icons.plist"];
        cc.LoaderScene.preload(iconsPlist, function () {
            let simpleScene = cc.Scene.extend({
                onEnter() {
                    let spinButton = ccui.Button.create("img/button_spin.png");
                    let background = cc.Sprite.create("img/bg.png");
                    let redLine = document.querySelector(".slots__red_line");
                    let result = cc.LabelTTF.create("Result: Welcome", "Nunito", 50);
                    let size = cc.director.getWinSizeInPixels();
                    let start = false;  
                    let slots = [];
                    result.setFontFillColor("black"); 
                    cc.spriteFrameCache.addSpriteFrames("img/icons.plist");
                    this._super();  
                
                    function getRandomInt(int) {
                        return Math.random() * int;
                    };
                   
                    for (let i = 0; i < 9; i++) {
                        slots.push(new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icons/" + Math.floor(getRandomInt(8)) + ".png")));
                        this.addChild(slots[i], 1);
                    };
                  
                    function runSpin() {
                        if(start) {
                            return;
                        }

                        start = true;
                        redLine.style.display = "none";
                        spinButton.loadTextures("img/button_spin_blocked.png");
                        result.setString("Result: Spinning");
                      
                    let spin = setInterval(function() {
                        for (i = 0; i < slots.length; i++) {
                            slots[i].id = Math.floor(getRandomInt(8));
                            slots[i].initWithSpriteFrameName("icons/" + slots[i].id + ".png"); 
                        }
                    }, 100)
                      
                    setTimeout(function() { 
                            clearInterval(spin); 
                            checkWinnner();
                            start = false;
                            spinButton.loadTextures("img/button_spin.png");
                        }, 10000);
                    }; 
                  
                    let self = this;
                    let textureSetting = function (texture, x, y, scaleValue, z_index) {
                        texture.setPosition(size.width/x, size.height/y);
                        texture.setScale(scaleValue);
                        self.addChild(texture, z_index);
                    };

                        textureSetting(result, 3.5, 8, 1, 1);
                        textureSetting(spinButton, 1.27, 8, 1.5, 1);
                        textureSetting(background, 2.05, 1.99, 1.4, 0);
                   
                    let slotsPositioning = function(initialIndex, maxIndex, y_Index) {
                        let Y_pos = [1.32, 1.8, 2.8],
                            X_pos = [4.4, 2, 1.3],
                            index = 0;
                        
                        for (let i = initialIndex; i < maxIndex; i++) {
                            slots[i].setPosition(size.width / X_pos[index], size.height / Y_pos[y_Index]);
                            index++;
                        }
                    };

                        slotsPositioning(0,3,0); 
                        slotsPositioning(3,6,1); 
                        slotsPositioning(6,9,2); 
                 
                    function checkWinnner() {
                        if (slots[3].id == slots[4].id || slots[3].id == slots[5].id || slots[4].id == slots[5].id) {
                            result.setString("Result: Win");
                            redLine.style.display = "block";
                        } else {
                            result.setString("Result: Not Win");
                        }
                    };

                    function touchEvent(sender,  type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                            runSpin();
                            break;
                        }
                    }
                    spinButton.addTouchEventListener(touchEvent, this);
                }
            });
            cc.director.runScene(new simpleScene());
        }, this);
    };
cc.game.run("canvas");