angular.
    module('clientList').
    component('clientList', {
        templateUrl: 'client-list/client-list.template.html',
        controller: function ClientListController($scope, lclStorage) {

            $scope.index = 0;
            $scope.clients = lclStorage.getClients();

            if($scope.clients == null){
                $scope.primary = 0;
            }else{
                var last = $scope.clients[$scope.clients.length - 1]
                $scope.primary = last.id;
            }

            $scope.delete = function (index) {
                var conf = confirm("Deseja realmente excluir?");

                if (conf == true) {
                    clients = lclStorage.delete(index);
                    $scope.clients = clients;
                }
            }

            $scope.addClient = function(){
                var person = {
                    id : parseInt($scope.primary) + 1,
                    name : $scope.client.name,
                    gender : $scope.client.gender,
                    age : $scope.client.age,
                }
                clients = lclStorage.add(person);
                $scope.clients = clients;
                closeModal();
            }

            $scope.edit = function(index){
                $scope.client_detail = $scope.clients[index];
                var modal_element = angular.element('#modalUpdate');
                modal_element.addClass('is-active');
                $scope.index = index;
            }

            $scope.update = function(){

                var person = {
                    name : $scope.client_detail.name,
                    gender : $scope.client_detail.gender,
                    age : $scope.client_detail.age,
                }

                clients = lclStorage.update($scope.client_detail,$scope.index);
                var modal_element = angular.element('#modalUpdate');
                modal_element.removeClass('is-active');
            }
        }
    });