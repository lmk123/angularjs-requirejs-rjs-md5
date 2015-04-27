define( [ '../app' ] , function ( directives ) {
    directives.directive( 'focusMe' , function () {
        return {
            link : function ( scope , element ) {
                element[ 0 ].focus();
            }
        }
    } );
} );
