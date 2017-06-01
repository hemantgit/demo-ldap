(function () {

    /**
     * Controller for stepped-slider components
     * Adds a mapper between options and values to local scope
     * @ngInject
     */
    function SteppedSliderController($scope) {

    }

    angular.module('forms-ui').controller('SteppedSliderController', ['$scope', SteppedSliderController]);
    angular.module('forms-ui').directive('steppedSliderContent', function () {
        return {
            restrict: 'C',
            controller: 'SteppedSliderController as controller',
            template: '<div class="stepped_slider__bar">' +
            '<div class="stepped_slider__bar__progress"></div>' +
            '<div class="slider_bar__knob" ng-mousedown="knobDown($event)" ng-mouseup="knobUp($event)">' +
            '<div class="slider_bar__knob__value"><span>{{element.value[0] | currency:"€":0}}</span></div>' +
            '<div class="slider_bar__knob__content">' +
            '<div class="slider_bar__knob__content_line"></div>' +
            '<div class="slider_bar__knob__content_line"></div>' +
            '<div class="slider_bar__knob__content_line"></div>' +
            '<div class="slider_bar__knob__content_line"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="stepped_slider__values">' +
            '<div ng-repeat="item in element._e.domain" value="{{item.value}}" ng-click="selectValueItem($event)" class="stepped_slider__values__value_item">' +
            '<div class="dashline"></div>' +
            '<span>{{item.displayValue}}</span>' +
            '</div>' +
            '</div>',
            link: function ($scope, element, attrs) {
                var dataElement = $scope.element._e;


                var _this = this;
                this.valueDomain = dataElement.domain;

                $scope.$watch("element.value", function (pNewValue, pOldValue) {
                    if (pNewValue != pOldValue) {
                        _this.selectByValue(pNewValue[0]);
                    }
                });

                $scope.$watch("element._e.domain", function (pNewValue, pOldValue) {
                    _this.setupValues();
                });
                //------------------------
                this.cacheItems = function () {
                    this.container = (element.context)?element.context:element[0];

                    this.knob = this.container.querySelector(".slider_bar__knob");
                    this.knobBar = this.container.querySelector(".stepped_slider__bar");
                    this.progressBar = this.knobBar.querySelector(".stepped_slider__bar__progress");
                    this.containerValues = this.container.querySelector(".stepped_slider__values");
                    this.containerValueItems = this.container.getElementsByClassName("stepped_slider__values__value_item");
                    var rect = this.knobBar.getBoundingClientRect();
                    this.limitX = rect.width;
                    this.startX = rect.left;



                }.bind(this);
                //------------------------Z
                this.init = function () {
                    this.cacheItems();
                    window.setTimeout(function () {
                        console.log("SteppedSlider Controller Starting value::", dataElement);
                        _this.setupValues();
                        var currentValue = parseFloat($scope.element.value[0]);
                        if (currentValue >= 0) {
                            _this.selectByValue(currentValue);
                        } else {
                            $scope.selectValueItem(_this.containerValueItems[0]);
                        }
                        $scope.$evalAsync();
                    }, 0);

                }.bind(this);

                this.selectByValue = function (pValue) {
                    var limit = this.containerValueItems.length;
                    while (--limit >= 0) {
                        var cItem = _this.containerValueItems[limit];
                        var value = parseFloat(cItem.getAttribute("value"));
                        if (value == pValue) {
                            $scope.selectValueItem(cItem);
                            break;
                        }
                    }
                }.bind(this);

                this.setupValues = function () {
                    var lim = this.valueDomain.length;
                    var length = this.valueDomain.length;
                    var cElem;
                    this.maxValue = 0;
                    while (--lim >= 0) {
                        cElem = this.valueDomain[lim];
                        if (parseFloat(cElem.value) > this.maxValue) this.maxValue = parseFloat(cElem.value);
                    }
                    lim = this.containerValueItems.length;
                    while (--lim >= 0) {
                        cElem = this.containerValueItems[lim];
                        var perc = ((lim / (length - 1)) * 100);
                        cElem.style.left = perc + "%";
                        cElem.posPerc = perc;
                    }

                }.bind(this);

                this.drag = function (e) {

                    var moveX = e.clientX - this.startX;
                    if (moveX > 0 && moveX < this.limitX) {
                        this.knob.moved = moveX;
                        this.knob.style.left = this.knob.moved + "px";
                        var minPerc = this.knob.moved / this.limitX;
                        var perc = (minPerc) * 100;
                        this.progressBar.style.width = perc + "%";
                        this.barProgress = perc;
                    }
                }.bind(this);

                /// SCOPE BINDS

                $scope.selectValueItem = function (pValueItem) {
                    if (!pValueItem)return;
                    if (pValueItem.originalEvent) pValueItem = pValueItem.originalEvent.target;
                    var closestVal = parseFloat(pValueItem.posPerc);

                    var closestMoney = pValueItem.getAttribute("value");
                    var minPerc = closestVal / 100;
                    this.knob.moved = minPerc * this.limitX;
                    this.knob.style.left = this.knob.moved + "px";
                    var perc = (minPerc) * 100;
                    this.progressBar.style.width = perc + "%";
                    $scope.element.value[0] = closestMoney;
                    $scope.$emit("update");
                    $scope.$evalAsync();
                }.bind(this);

                $scope.knobDown = function (pEvent) {
                    var rect = this.knobBar.getBoundingClientRect();
                    this.limitX = rect.width;
                    this.startX = rect.left;
                    this.knob.moved = 0;
                    //--
                    document.addEventListener("mousemove", this.drag);
                    document.addEventListener("mouseup", $scope.knobUp);

                }.bind(this);
                $scope.knobUp = function () {
                    //--
                    var closestItem = null;
                    var minDiff = 9999999999999;
                    var lim = this.containerValueItems.length;
                    var cElem;
                    //--
                    while (--lim >= 0) {
                        cElem = this.containerValueItems[lim];
                        var valueItemPerc = parseFloat(cElem.posPerc);
                        var diff = Math.abs(valueItemPerc - this.barProgress);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closestItem = cElem;
                        }
                    }
                    $scope.selectValueItem(closestItem);
                    document.removeEventListener("mousemove", this.drag);

                }.bind(this);
                this.init();
            }
        };
    });
})();
