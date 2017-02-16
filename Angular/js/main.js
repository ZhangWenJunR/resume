/**
 * Created by MBENBEN on 2017/2/15.
 */
angular.module('myApp',[])
.controller('signUpController',function($scope){
        $scope.userdata = {};
        $scope.submitForm = function(){
            console.log($scope.userdata);
            if($scope.signUpForm.$invalid){ //这里能在$scope里调用signUpForm是因为前台里用了ng-submit
            alert('请检查您的信息！');
            }else{
            alert('提交成功！');
            }
            /*console.log('表单提交啦！')*/
        }

    })
.directive('compare',function(){
        var o = {};
        o.strict = 'AE';//作用在元素和属性上
        o.scope = {
            orgText:'=compare'
        };
        o.require = 'ngModel';
        o.link = function(sco,ele,att,con){ //作用域，元素，属性，ng-controller
            con.$validators.compare = function(v){
                return v == sco.orgText
            };
            sco.$watch('orgText',function(){
                con.$validate()
            })
        };
        return o
});
