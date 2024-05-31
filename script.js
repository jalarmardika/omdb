const form = document.getElementById('form-search')
form.addEventListener('submit', function(e){
	e.preventDefault()
	const content = document.querySelector('.content')
	const keyword = form.querySelector('#keyword').value
	fetch('http://omdbapi.com/?apikey=fb5e3bc5&s=' + keyword)
	 .then(function(response){
	 	return response.json()
	 })
	 .then(function(data){
	 	if (data.Response === "False") throw new Error(data.Error)
	 	let cards = '';
	 	data.Search.forEach(function(movie){
	 		return cards += displayMovie(movie)
	 	})
	 	content.innerHTML = cards;
	 })
	 .catch(function(error){
	 	content.innerHTML = `<div class='col-md-12'>
	 							<div class='alert alert-danger alert-dismissible mt-3'>
									<button type='button' class='close' data-dismiss='alert'>&times;</button>
									<b>${error.message}</b>
								</div>
							</div>`;
	 })
})

function displayMovie(movie){
	return `<div class="col-md-4">
				<div class="card shadow mb-4">
					<img src="${movie.Poster}" class="card-img-top">
					<div class="card-body">
						<h5 class="card-title">${movie.Title}</h5>
						<p class="card-text">${movie.Year}</p>
						<a href="#" data-id="${movie.imdbID}" data-toggle="modal" data-target="#modalDetail" class="btn btn-primary btn-detail">View Detail</a>
					</div>
				</div>
			</div>`;
}


document.addEventListener('click', function(e){
	if (e.target.classList.contains('btn-detail')) {
		let imdbID = e.target.dataset.id;
		const modalBody = document.querySelector('.modal-body')
		fetch('http://omdbapi.com/?apikey=fb5e3bc5&i=' + imdbID)
		 .then(function(response){
	 		return response.json()
		 })
		 .then(function(data){
		 	if (data.Response === "False") throw new Error(data.Error)
			modalBody.innerHTML = `<div class="row">
							          <div class="col-md-4">
							            <img src="${data.Poster}" class="img-fluid mb-3">
							          </div>
							          <div class="col-md-8">
							            <ul class="list-group">
							              <li class="list-group-item">Title: ${data.Title}</li>
							              <li class="list-group-item">Released: ${data.Released}</li>
							              <li class="list-group-item">Country: ${data.Country}</li>
							              <li class="list-group-item">Director: ${data.Director}</li>
							              <li class="list-group-item">Actors: ${data.Actors}</li>
							              <li class="list-group-item">Writer: ${data.Writer}</li>
							              <li class="list-group-item">Genre: ${data.Genre}</li>
							            </ul>
							          </div>
							          <div class="col-md-12 deskripsi">

							          </div>
							       </div>`;
		 })
		 .catch(function(error){
		 	modalBody.innerHTML = `<b>${error.message}</b>`;
		 })
	}
})

// -------------------------------------------------------------------------------------
// Versi async await
// const form = document.getElementById('form-search')
// form.addEventListener('submit', async function(e){
// 	e.preventDefault()
// 	const content = document.querySelector('.content')
// 	const keyword = form.querySelector('#keyword').value
// 	try{
// 		const request = await fetch('http://omdbapi.com/?apikey=fb5e3bc5&s=' + keyword)
// 		const response = await request.json()
// 		if (response.Response === "False") {
// 			throw new Error(response.Error)
// 		}
// 		let cards = '';
// 		response.Search.forEach(function(movie){
// 			return cards += displayMovie(movie)
// 		})
// 		content.innerHTML = cards;
// 	} catch(err){
// 		content.innerHTML = `<div class='col-md-12'>
// 	 							<div class='alert alert-danger alert-dismissible mt-3'>
// 									<button type='button' class='close' data-dismiss='alert'>&times;</button>
// 									<b>${err.message}</b>
// 								</div>
// 							</div>`;
// 	} 
// })

// function displayMovie(movie){
// 	return `<div class="col-md-4">
// 				<div class="card shadow mb-4">
// 					<img src="${movie.Poster}" class="card-img-top">
// 					<div class="card-body">
// 						<h5 class="card-title">${movie.Title}</h5>
// 						<p class="card-text">${movie.Year}</p>
// 						<a href="#" data-id="${movie.imdbID}" data-toggle="modal" data-target="#modalDetail" class="btn btn-primary btn-detail">View Detail</a>
// 					</div>
// 				</div>
// 			</div>`;
// }

// document.addEventListener('click', async function(e){
// 	if (e.target.classList.contains('btn-detail')) {
// 		const imdbID = e.target.dataset.id
// 		const modalBody = document.querySelector('.modal-body')
// 		try{
// 			const req = await fetch('http://omdbapi.com/?apikey=fb5e3bc5&i=' + imdbID)
// 			const res = await req.json()
// 			if (res.Response === "False") throw new Error(res.Error)
// 			modalBody.innerHTML = `<div class="row">
// 							          <div class="col-md-4">
// 							            <img src="${res.Poster}" class="img-fluid mb-3">
// 							          </div>
// 							          <div class="col-md-8">
// 							            <ul class="list-group">
// 							              <li class="list-group-item">Title: ${res.Title}</li>
// 							              <li class="list-group-item">Released: ${res.Released}</li>
// 							              <li class="list-group-item">Country: ${res.Country}</li>
// 							              <li class="list-group-item">Director: ${res.Director}</li>
// 							              <li class="list-group-item">Actors: ${res.Actors}</li>
// 							              <li class="list-group-item">Writer: ${res.Writer}</li>
// 							              <li class="list-group-item">Genre: ${res.Genre}</li>
// 							            </ul>
// 							          </div>
// 							          <div class="col-md-12 deskripsi">

// 							          </div>
// 							       </div>`;
// 		} catch(err){
// 			modalBody.innerHTML = `<b>${err.message}</b>`;
// 		}
// 	}
// })