/**
 * Created by MBENBEN on 2017/2/16.
 */
var myApp=angular.module('myApp',[]);
myApp.controller('mainController',function ($scope) {
    $scope.userData={
        username:''
    };
    $scope.submitForm=function () {
        //console.log($scope.userData);
        console.log($scope);
        if($scope.signUpForm.$invalid){ //这里能在$scope里调用signUpForm是因为前台里用了ng-submit
            alert('提交失败');
        }else{
            alert('提交成功');
        }
    }
});
myApp.directive('compare',function () {
    return{
        restrict:'AE',
        scope:{  //独立scope
            orgText:"=compare"  //scope的=绑定策略，获取的是compare的属性值
        },
        require:'ngModel',
        link:function (scope,element,attr,controller) {
            //給控制器添加验证规则，即往$validators属性里添加
            controller.$validators.compare=function (v) {  //这里的v就是确认密码
                return v==scope.orgText;
            }
            //监听密码有没有改变，有改变了控制器就继续验证确认密码和它是否相等
            scope.$watch('orgText',function () {  //orgText是密码的值
                controller.$validate();  // $validate()是控制器所有验证规则的方法
            })
        }
    }
});