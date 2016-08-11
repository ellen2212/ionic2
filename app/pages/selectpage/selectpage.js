var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Deng on 2016/8/11.
 */
var core_1 = require('@angular/core');
var common_1 = require("../common");
var SelectPage = (function () {
    function SelectPage(commonfn) {
        this.addressType = '0'; //'0' or 'C'
        this.nextselect = [];
        this.nextcheckbox = [];
        this.onSelect = new core_1.EventEmitter();
        this.commonfn = commonfn;
    }
    /*********************************************
     * 下一个选择框
     * input : aa userid
     *         istoggle 是否切换
     *         callback 回调
     *********************************************/
    SelectPage.prototype.nextselectfn = function (aa, istoggle, callback) {
        if (!callback && istoggle) {
            callback = istoggle;
            istoggle = undefined;
        }
        if (istoggle == undefined) {
            istoggle = true;
        }
        var _this = this;
        this.commonfn.getGroupOrUserList(2, aa, this.addressType, function (tmpdata) {
            if (_this.nextselect == undefined) {
                var tmp = {};
                tmp[aa] = tmpdata;
                _this.nextselect = tmp;
            }
            else if (!_this.nextselect[aa]) {
                _this.nextselect[aa] = tmpdata;
            }
            if (istoggle) {
                _this.nextselect[aa]['isopen'] = !_this.nextselect[aa]['isopen'];
            }
            else {
                _this.nextselect[aa]['isopen'] = true;
            }
            callback && callback();
        });
    };
    /*********************************************
     * 确定按钮【控制选项框与内容框的切换】
     * input : none
     *********************************************/
    SelectPage.prototype.sureselectfn = function () {
        this.onSelect.emit(this.selectusers);
    };
    /*********************************************
     * 二级父checkbox选择框
     * input : aa userid e  boolean 选择项的值
     *********************************************/
    SelectPage.prototype.selectall = function (aa, e) {
        var _this = this;
        this.nextselectfn(aa, false, function () {
            _this.ChooseallOrnot(e, _this.nextselect[aa]);
        });
    };
    /*********************************************
     * 全选以及全不选
     * input :  e  boolean 选择项的值 tmpdata 子部门数据
     *********************************************/
    SelectPage.prototype.ChooseallOrnot = function (e, tmpdata) {
        if (e) {
            //全选
            for (var _i = 0; _i < tmpdata.length; _i++) {
                var t = tmpdata[_i];
                this.selectusers[t.userid + '@' + t.username] = true;
            }
        }
        else {
            //全不选
            for (var _a = 0; _a < tmpdata.length; _a++) {
                var t = tmpdata[_a];
                this.selectusers[t.userid + '@' + t.username] = false;
            }
        }
        //this.selusers();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "selectusers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "selectitems", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectPage.prototype, "onSelect", void 0);
    SelectPage = __decorate([
        core_1.Component({
            selector: 'my-select',
            templateUrl: 'build/pages/selectpage/selectpage.html',
            inputs: ['selectitems', 'selectusers']
        }), 
        __metadata('design:paramtypes', [common_1.CommonComponent])
    ], SelectPage);
    return SelectPage;
})();
exports.SelectPage = SelectPage;