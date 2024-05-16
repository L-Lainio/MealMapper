import { rendersignup } from "./signup.js";
import { renderRecord } from "./record.js";

export function renderlogin() {
	$("#root").empty();
	$("#root").append(
		$(`  <div class="container-fluid">
                <div class="row text-center m-5">
                    <h1>Login/Signup Page</h1>
                </div>
                <div>

                    <div class="row justify-content-evenly mb-5">


                        <div class="card col-sm-5">
                            <article class="card-body">
                                <h4 class="card-title mb-4 mt-1">Sign In</h4>
                                <form>

                                    <div class="form-group">
                                        <label>Your Email:</label>
                                        <input name="" class="form-control" placeholder="Email" type="email">
                                    </div> <!-- form-group// -->
                                    <div class="form-group">
                                        <label>Your Password:</label>
                                        <input class="form-control" placeholder="******" type="password">
                                    </div> <!-- form-group// -->
                                    <div class="form-group">
                                    </div> <!-- form-group// -->
                                    <div class="form-group row">
                                        <button type="submit" class="btn btn-primary btn-block mt-2"> Login </button>
                                    </div> <!-- form-group// -->
                                </form>
                            </article>
                        </div> <!-- card.// -->
                        <div class="card col-sm-5">
                            <article class="card-body">
                                <h4 class="card-title mb-4 mt-1">Sign Up</h4>
                                <form>
                                    <div class="form-group">
                                        <label>Your Name:</label>
                                        <input name="" class="form-control" placeholder="Email" type="email">
                                    </div> <!-- form-group// -->
                                    <div class="form-group">
                                        <label>Your Email:</label>
                                        <input name="" class="form-control" placeholder="Email" type="email">
                                    </div> <!-- form-group// -->
                                    <div class="form-group">
                                        <label>Your Password:</label>
                                        <input class="form-control" placeholder="******" type="password">
                                    </div> <!-- form-group// -->
                                    <div class="form-group">
                                    </div> <!-- form-group// -->
                                    <div class="form-group row">
                                        <button type="submit" class="btn btn-primary btn-block mt-2"> Submit </button>
                                    </div> <!-- form-group// -->
                                </form>
                            </article>
                        </div> <!-- card.// -->

                    </div>
                </div>`)
	);
}

export async function loginUser(username, password) {
	try {
		const result = await axios({
			method: "post",
			url: "http://localhost:3001/login",
			data: {
				name: username,
				pass: password,
			},
		});
		// console.log(result.data.jwt);
		return result;
	} catch (error) {
		$(".warning-cont")
			.empty()
			.append(
				$(
					`<p class='has-background-danger has-text-white'>${error} Wrong username/password.</p>`
				)
			);
		// console.log(error);
		return "error";
	}
}

export async function loginOnClick() {
	let username = $("#login-username").val();
	let password = $("#login-password").val();
	let loginreturn = await loginUser(username, password);

	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	let day = today.getDate();
	if (day < 10) {
		day = "0" + day;
	}
	today = "" + year + month + day;
	let defaultdate = "" + year + "-" + month + "-" + day;

	if (loginreturn != "error") {
		document.cookie = "newjwt=" + loginreturn.data.jwt;
		await renderRecord(defaultdate, today);
	}
}

$("body").on("click", "#login", loginOnClick);
$("body").on("click", ".redirect-signup", rendersignup);
