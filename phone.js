const loadPhone = async(searchText, isShowAll )=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll )=>{
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent='';

    // display show all button if there are more phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    // display only first 12 phones
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        console.log(phone);
        //2 create a div
        const phoneCard = document.createElement('div');
        // 3 set inner html
        phoneCard.classList=`card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML=`
        <figure>
            <img src="${phone.image}" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        // 4. append child
        
        phoneContainer.appendChild(phoneCard);

    })
    // hide loading spinner
    toggleLoadingSpinner(false)
}

// handle search button
const  handleSearch = (isShowAll)=>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSpinner =(isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
   if(isLoading){
    loadingSpinner.classList.remove('hidden');
   }
   else{
    loadingSpinner.classList.add('hidden');
   }
}

// handle show all
const handleShowAll = ()=>{
    handleSearch(true);
}
// loadPhone();