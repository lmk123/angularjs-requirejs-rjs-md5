define( [ './directives' ] , function ( directives ) {
    directives.register.directive( 'indexDes' , function () {
        return {
            link : function ( scope , element ) {
                element[ 0 ].textContent = scope.des;
            }
        }
    } );
} );
