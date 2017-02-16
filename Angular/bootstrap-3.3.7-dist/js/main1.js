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
        if($scope.signUpForm.$invalid){ //��������$scope�����signUpForm����Ϊǰ̨������ng-submit
            alert('�ύʧ��');
        }else{
            alert('�ύ�ɹ�');
        }
    }
});
myApp.directive('compare',function () {
    return{
        restrict:'AE',
        scope:{  //����scope
            orgText:"=compare"  //scope��=�󶨲��ԣ���ȡ����compare������ֵ
        },
        require:'ngModel',
        link:function (scope,element,attr,controller) {
            //�o�����������֤���򣬼���$validators���������
            controller.$validators.compare=function (v) {  //�����v����ȷ������
                return v==scope.orgText;
            }
            //����������û�иı䣬�иı��˿������ͼ�����֤ȷ����������Ƿ����
            scope.$watch('orgText',function () {  //orgText�������ֵ
                controller.$validate();  // $validate()�ǿ�����������֤����ķ���
            })
        }
    }
});