define( [ './directives' ] , function ( directives ) {
    directives.register.directive( 'focusMe' , function () {
        return {
            link : function ( scope , element ) {
                element[ 0 ].focus();
            }
        }
    } );
} );
