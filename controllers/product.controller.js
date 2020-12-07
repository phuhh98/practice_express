const Product = require("../models/product.model.js");

module.exports.productPagination = async function(req, res, next) {
	
	console.log(res.locals.products);
	if (!res.locals.products) {
		next();
		return;
	}

	let items = 8;
	let productList = res.locals.products || await Product.find();
	let maxPage = Math.ceil(productList.length/items);	//tinh so page toi da co the bieu dien tu database
	let page = parseInt(req.query.page) || 1; // chu y phai parseInt page query sang so tu nhien moi cong tru duoc ngon lanh
	
	if (page<1) {
		res.redirect("?page=1");	// dieu huong ve page 1 neu so page nho hon 1
	}
	if (page > maxPage) {
		res.redirect(`?page=${maxPage}`);	// dieu huong ve maxPage neu so page lon hon maxPage
	}

	let start = (page-1)*items;
	let end = page*items;

	let maxPageOption = Math.ceil(page/3)*3;
	let pageOptions = [];
	for (let i = maxPageOption; i>maxPageOption-3; i--) {		//so trang co the chon tren thanh pageOptions
		pageOptions.unshift(i);
	}

	pageOptions = pageOptions.filter(function (curr) {
		return curr <= maxPage;
	});

	let products = productList.slice(start,end);		//slice mot so luong phan tu trong db de bieu dien

	res.locals.products = products;
	res.locals.pageOptions = pageOptions;
	res.locals.currentPage = page;
	next();
}

module.exports.pageRender = function(req, res, next) {
	res.render("products/index.pug")
}

module.exports.itemSearch = async function(req, res, next) {
	let name = req.query.name;
	
	try {
		var productList = await Product.find();
	} catch(err) {
		console.err(err);
	}

	let matchedProducts = productList.filter((product) => {
		return product.name.toLowerCase().includes(name.toLowerCase());
	});

	res.locals.lastSearch = name;

	if (matchedProducts.length === 0) {
		res.locals.products = null;
		next();
		return;
	}

	res.locals.products = matchedProducts;
	next();
}