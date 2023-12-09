const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "d41a679a2emshaf78a8aa3edf2b8p1bc9a1jsn1271e1d0786a",
        "X-RapidAPI-Host": "movies-api14.p.rapidapi.com"
    }
}

const movieInput = document.querySelector("input")

let params = ""
async function findMovie() {
    params = movieInput.value
    const response = await fetch(
        `https://movies-api14.p.rapidapi.com/search?query=${params}`,
        options
    )
    const data = await response.json()
    console.log(data)

    const container = document.getElementById("container")
    container.innerHTML = ""

    data.contents.map((content) => {
        container.innerHTML += `
		<div class="flex flex-col justify-between h-[500px] md:h-[440px] lg:h-[300px] w-full rounded-lg shadow-xl p-5 bg-slate-200/50">
			<div class="font-bold text-xl text-gray-800 uppercase ">${content.title}</div>
			<img src="${content.poster_path}" class=" w-full h-1/4 rounded-t-xl p-1 "/>
			<div class="font-semibold text-md text-gray-700 mb-5">${content.release_date}</div>
			<a href="${content.youtube_trailer}">
				${content.youtube_trailer}</a>
			<button id="getDetails-${content._id}"class="text-white px-4 py-2 mt-5 rounded-md bg-sky-400 hover:text-gray-800 transition-all duration-300 hover:shadow-xl">Get more details</button>
			
		</div>
		`
    })
    data.contents.forEach((content) => {
        document
            .getElementById(`getDetails-${content._id}`)
            .addEventListener("click", () => {
                getDetails(content._id)
            })
    })
    movieInput.value = ""

    async function getDetails(_id) {
        
        const modalWindow = document.getElementById("openModal")
        modalWindow.style.display = "flex"

        const resp = await fetch(
            `https://movies-api14.p.rapidapi.com/movie/${_id}`,
            options
        )
        const data2 = await resp.json()
        console.log(data2)
        console.log(data2.movie.genres)
        console.log(data2.movie.overview)

        const modalContainer = document.getElementById("modalContainer")
        modalContainer.innerHTML = ""
        modalContainer.innerHTML += `
            <div class="flex gap-4 items-center">
                <p class="text-lg">Genres: </p>
                <p>${data2.movie.genres}</p>
            </div>
            <div class="flex gap-4 items-center">
                <p class="text-lg">Overview: </p>
                <p>${data2.movie.overview}</p>
            </div>               
		`
    }

    const modalBtn = document.getElementById("closeModal")
    modalBtn.addEventListener("click", () => {
        document.getElementById("openModal").style.display = "none"
    })
}

const btn = document.getElementById("search")
btn.addEventListener("click", findMovie)