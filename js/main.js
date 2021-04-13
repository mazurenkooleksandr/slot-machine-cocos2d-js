cc.game.onStart = function(){
    
    let iconsPlist = ["img/icons.plist"];
        cc.LoaderScene.preload(iconsPlist, function () {
            let simpleScene = cc.Scene.extend({
                onEnter() {
                    this._super();  
                    let spinButton = ccui.Button.create("img/button_spin.png");
                    let background = cc.Sprite.create("img/bg.jpg");
                    let result = cc.LabelTTF.create("Result: Welcome", "Nunito", 50);
                    let size = cc.director.getWinSizeInPixels();
                    let start = false;  
                    let slots = [];
                    result.setFontFillColor("black"); 
                    cc.spriteFrameCache.addSpriteFrames("img/icons.plist");
                    
                    let sprite = new cc.Sprite.create("img/ship.png");
                    sprite.setAnchorPoint(cc.p(0.5, 0.5));
                    sprite.setScale(0.3);
                    sprite.setPosition(cc.p(size.width/1.28, size.height/9));
                    this.addChild(sprite, 1);

                    
                    
                    cc.log(sprite);
                    
                
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
                        }, 3000);
                    }; 
                  
                    let self = this;
                    let textureSetting = function (texture, x, y, scaleValue, z_index) {
                        texture.setPosition(size.width/x, size.height/y);
                        texture.setScale(scaleValue);
                        self.addChild(texture, z_index);
                    };

                        textureSetting(result, 4.5, 9, 1, 1);
                        textureSetting(spinButton, 3.07, 3.5, 1.5, 1);
                        textureSetting(background, 2.05, 1.99, 1.4, 0);
                        
                   
                    let slotsPositioning = function(initialIndex, maxIndex, y_Index) {
                        let Y_pos = [1.12, 1.45, 2.1],
                            X_pos = [6.2, 3.1, 2.08],
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

                        if(x == 1421.875, y == 93.33333333333333){
                            if(slots[3].id == slots[4].id || slots[3].id == slots[5].id || slots[4].id == slots[5].id){
                                result.setString("Result: Go to Pluto");
                                av = sprite.setPosition(cc.p(size.width/2.28, size.height/9));
                               
                            }else {
                                result.setString("Result: Not Win"); 
                        }

                        
                    
                        
                        // if(b){
                        //     if(slots[3].id == slots[4].id || slots[3].id == slots[5].id || slots[4].id == slots[5].id){
                        //         result.setString("Result: Go to sssluto");
                        //     //    c = sprite.setPosition(cc.p(size.width/3.28, size.height/9)); 
                        //     //    b= null;
                        //     }else {
                        //         result.setString("Result: Not Win"); 
                        // }

                        // if(c){
                        //     if(slots[3].id == slots[4].id || slots[3].id == slots[5].id || slots[4].id == slots[5].id){
                        //         result.setString("Result: Go to 888luto");
                        //         sprite.setPosition(cc.p(size.width/4.28, size.height/9)); 
                        //     }else {
                        //         result.setString("Result: Not Win"); 
                        //     }
                        // }
                    }

                    

                        
                            
                            // if ((size.width/1.28, size.height/9) && slots[3].id == slots[4].id || slots[3].id == slots[5].id || slots[4].id == slots[5].id){
                            //     result.setString("Result: Go to Pluto");
                            //     textureSetting(ship, 1.44, 9, 0.3, 1); 
                            // }else if ((size.width/1.44, size.height/9) && slots[3].id == slots[4].id || slots[3].id == slots[5].id || slots[4].id == slots[5].id){
                            //     result.setString("Result: Go to ddd");
                            //     textureSetting(ship, 3.44, 9, 0.3, 1); 
                            // }else {
                            //     result.setString("Result: Not Win");    
                            // }      
                            
                           
                        
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