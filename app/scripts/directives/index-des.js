define( [ './directives' ] , function ( directives ) {
    directives.directive( 'indexDes' , function () {
        return {
            link : function ( scope , element ) {
                element[ 0 ].textContent = scope.des;
            }
        }
    } );
} );
