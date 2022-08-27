

const FaqPage = () => {
    return (
        <div className="container mt-5">
            <h3 className="">Frequently asked questions</h3>

            <div class="accordion mt-3" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            How does it work?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Autobooker is a website that will automatically book volleyball / basketball slots for you in the future so that you do not need to remind yourself on the day / wake up early to secure those spots. All you need to do is fill in the booking information using the form with the appropriate information. Then on the day the booking is available, it will automatically book the slots for you.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Is my password safe?
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            The password you provide to the website is encrypted before being saved to our database, meaning that your plain-text password is never stored in the database. <strong>However, this does not mean that it is 100% safe.</strong> As the encryption can be reversed if the hacker gains access to a private password (unikely) used to encrypt the password. Use at your own risk.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Why did my booking not work?
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            This may be due to a bug in the code or an error with the information provided. If your booking has failed, there will be a given reason in the 'Past Bookings' table. <strong>Please make sure that the correct/valid information is provided with regards to the booking.</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqPage;