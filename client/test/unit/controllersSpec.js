'use strict';

describe('CartController', function () {
    var scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.cart = [{ product: { price: 200 }, quantity: 2 }, { product: { price: 100 }, quantity: 1}];
        var ctl = new CartController(scope);
    }));

    it('should show the total price', function () {
        expect(scope.sum).toEqual(500);
    });

    it('should show a price per order line', function () {
        expect(scope.cartItems.length).toEqual(scope.cart.length);
        expect(scope.cartItems[0].price).toEqual(400);
        expect(scope.cartItems[1].price).toEqual(100);
    });
});

describe('CategoryController', function () {
    var scope;

    beforeEach(inject(function ($http, $httpBackend, $rootScope) {
        scope = $rootScope.$new();
        $httpBackend.expectGET('/categories/food').respond({ id: 'food' });
        var routeParams = { id: 'food' };
        var ctl = new CategoryController(scope, $http, routeParams, $rootScope);
        scope.$emit('$routeChangeSuccess');
        $httpBackend.flush();
    }));

    it('should fetch the category from /categories/food and put it into the scope', function () {
        expect(scope.category.id).toEqual('food');
    });

    it('should broadcast an event when the user tries to buy an item', inject(function ($rootScope) {
        var broadcasted;
        $rootScope.$on('itemAddedToCart', function (event, params) {
            broadcasted = params;
        });
        scope.addToCart({ id: 'one' }, 3);
        expect(broadcasted).toBeDefined();
    }));
});

describe('BrowseController', function () {
    var scope;

    beforeEach(inject(function ($rootScope, $http, $httpBackend) {
        $httpBackend.expectGET('/categories').respond({ one: { id: 'one' }, two: { id: 'two'} });
        scope = $rootScope.$new();
        var ctl = new BrowseController(scope, $http);
        $httpBackend.flush();
    }));

    it('should fetch the categories from /categories and put them into the scope', function () {
        expect(scope.categories.one.id).toEqual('one');
    });
});

describe('HomeController', function () {
    var ctl, scope, emittedArea;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.$on('areaChanged', function (event, area) { emittedArea = area; });
        ctl = new HomeController(scope);
    }));

    it('should emit the area changed event on construction', function () {
        expect(emittedArea).toEqual('home');
    });
});

describe('PageController', function () {
    var pageController, scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        pageController = new PageController(scope);
    }));

    it('should change the active area on the "areaChanged" event', function () {
        scope.$emit('areaChanged', 'testArea');
        expect(scope.activeArea).toEqual('testArea');
    });

    it('should update the cart display when receiving addItemToCart', function () {
        scope.$emit('itemAddedToCart', { product: {}, quantity: 3 });
        expect(scope.cart.length).toBe(1);
        expect(scope.cart[0].quantity).toBe(3);
    });
});
