ko.virtualElements.allowedBindings.stopBinding = true;

ko.bindingHandlers.stopBinding = {
    init: function() {
        return { controlsDescendantBindings: true };
    }
};

ko.bindingHandlers.bootstrapPopover = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = ko.utils.unwrapObservable(valueAccessor());
        var defaultOptions = {
            animation : true,
            trigger : 'hover',
            placement : 'bottom'
        };
        options = $.extend(true, {}, defaultOptions, options);
        $(element).popover(options);
    }
};
