const Product = require("../models/product.model.js");

module.exports.productPagination = async function(req, res, next) {
	
	// console.log(req);s
	if (res.locals.products === null) { // search yield no result
		next();
		return;
	}

	let page = parseInt(req.query.page) || 1; //current search page
	let itemsPerPage = 9;		//max items per page
	try {		
		if (res.locals.search) {		//neu da qua search
			let searchUrl = req.originalUrl;	// url toi
			let searchPattern = /\&page=\d/g;
			let url = searchUrl.replace(searchPattern, "") || searchUrl;	// url sau khi cat di "&page=..."

			res.locals.url = url;
		} else {
			res.locals.search = false;	// neu khong qua search thi bo qua cat url
		}	
	} catch(err) {
		console.error(err);
	}
	

	let productList = res.locals.products || await Product.find();
	let maxPage = Math.ceil(productList.length/itemsPerPage);	//tinh so page toi da co the bieu dien tu database
	
	if (page<1 || page > maxPage) {
		res.redirect(req.headers.referer || req.baseUrl);	// redirect ve trang ban dau neu destination page < 1 || > maxPage
		return;
	}

	let start = (page-1)*itemsPerPage;
	let end = page*itemsPerPage;

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
	res.locals.currentPage = parseInt(page);
	next();
}

module.exports.pageRender = function(req, res, next) {
	res.render("products/index.pug")
}

module.exports.itemSearch = async function(req, res, next) {
	let name = req.query.name || "";
	let search = true;
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
	if ( name == "") {
		search = false; 
	}
	res.locals.search = search;
	next();
}