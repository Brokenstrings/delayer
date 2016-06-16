var delayer = function (config){
	this.config = config || {'target' : 'body','source' : 'data-source','fixed' : 'data-fixed'};
	this.winHeight = window.innerHeight;
	this.target = this.config.target == 'body' ? document.body : document.body.querySelector(this.config.target);
	this.init();
};

delayer.prototype.init = function (){
	var _this = this;
	_this.loading();
	window.addEventListener('scroll',_this.scrollEvt,false);
};

delayer.prototype.loading = function (){
	var _this = this;
	var stop = _this.target.scrollTop,tags = _this.getTags();
	if(tags.length == 0){
		window.removeEventListener('scroll',_this.scrollEvt,false);
		return;
	}
	for(var i = 0; i < tags.length; i ++){
		var src = _this.getAttr(tags[i],_this.config.source),fixed = _this.getAttr(tags[i],_this.config.fixed);
		if(tags[i].offsetTop <= stop + _this.winHeight){
			_this.setAttr(tags[i],'src',src);
			_this.setAttr(tags[i],_this.config.source,null);
			_this.setAttr(tags[i],_this.config.fixed,null);
			if(fixed != null){
				tags[i].addEventListener('load',function (){
					_this.imageReady(this);
				},false);
			}
		}
	}
};

delayer.prototype.scrollEvt = function (){
	this === window ? this.delayer.loading() : this.loading();
};

delayer.prototype.getTags = function (){
	return this.target.querySelectorAll('img[data-source]');
};

delayer.prototype.getAttr = function (obj,name){
	return obj.getAttribute(name);
}

delayer.prototype.setAttr = function (obj,attrs,val){	
	if(typeof attrs == 'object'){
		for(var i in attr){
			if(attr[i] === null){
				obj.removeAttribute(i);
			}else{
				obj.setAttribute(i,attr[i]);
			}
		}
	}else{
		val == null ? obj.removeAttribute(attrs) : obj.setAttribute(attrs,val);
	}
}

delayer.prototype.imageReady = function (obj,box){
	var box = box || obj.parentNode.offsetWidth;
	var scale = 1 - obj.width / obj.height;
	if(scale == 0){
		obj.width = box,obj.height = box;
	}else if(scale > 0){
		obj.height = parseInt((box/obj.width) * obj.height),obj.width = box;
		obj.style.top = -((obj.height / obj.width) * box - box) / 2 + 'px';
	}else{
		obj.width = parseInt((box/obj.height) * obj.width),obj.height = box;
		obj.style.left = -parseInt((obj.width / obj.height) * box - box) / 2 + 'px';
	}
}
