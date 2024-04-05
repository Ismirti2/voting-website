let voters = [];
let loggedInVoter = null;
let selectedCandidate = null;
let candidates = [
  { name: "Candidate 1", votes: 0, image: "images/candidate1.jpeg" },
  { name: "Candidate 2", votes: 0, image: "images/candidate2.jpeg" },
  { name: "Candidate 3", votes: 0, image: "images/candidate3.jpeg" },
  { name: "Candidate 4", votes: 0, image: "images/candidate4.jpeg" },
  { name: "Candidate 5", votes: 0, image: "images/candidate5.jpeg" },
];

function validateRegistration() {
  const citizenCardNumber = document.getElementById("citizenCardNumber").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (
    !citizenCardNumber ||
    !name ||
    !address ||
    !password ||
    !confirmPassword
  ) {
    showError("All fields are required.");
    return false;
  }

  if (!/^\d{6}$/.test(citizenCardNumber)) {
    showError("Citizen Card Number must have 6 digits.");
    return false;
  }

  if (password.length < 8) {
    showError("Password must be at least 8 characters long.");
    return false;
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return false;
  }

  if (!/^[a-zA-Z]+$/.test(name)) {
    showError("Name must contain only letters.");
    return false;
  }
  clearError();
  return true;
}

function clearError() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.innerText = "";
  errorMessage.style.display = "none";
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.innerText = message;
  errorMessage.style.color = "red";
  errorMessage.style.display = "block";
}

function registerVoter() {
  if (validateRegistration()) {
    const citizenCardNumber =
      document.getElementById("citizenCardNumber").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;

    voters.push({ citizenCardNumber, name, address, password });
    console.log("Voter registered successfully:", voters[voters.length - 1]);
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }
}

function login() {
  const citizenCardNumberLogin = document.getElementById(
    "citizenCardNumberLogin"
  ).value;
  const username = document.getElementById("username").value;
  const passwordLogin = document.getElementById("passwordLogin").value;

  loggedInVoter = voters.find(
    (voter) =>
      voter.citizenCardNumber === citizenCardNumberLogin &&
      voter.name === username &&
      voter.password === passwordLogin
  );

  if (loggedInVoter) {
    console.log("Login successful!");
    displayCandidates();
  } else {
    console.log("Login failed. Voter not found.");
    document.getElementById("errorMessage").innerText =
      "Invalid login credentials.";
  }
}

function displayCandidates() {
  const candidatesDiv = document.getElementById("candidates");
  candidatesDiv.innerHTML = "<h3>Candidates</h3>";

  candidates.forEach((candidate) => {
    const candidateDiv = document.createElement("div");
    candidateDiv.classList.add("candidate");

    candidateDiv.innerHTML = `
            <div class="candidate-info">
                <img src="${candidate.image}" alt="${candidate.name}">
                <h4>${candidate.name}</h4>
                <p>Click to vote</p>
            </div>
            <div class="candidate-actions">
                <button onclick="vote('${candidate.name}')">Vote</button>
                <button onclick="deleteVote('${candidate.name}')">Delete Vote</button>
            </div>
        `;

    candidatesDiv.appendChild(candidateDiv);
  });
}

function vote(candidateName) {
  if (selectedCandidate && selectedCandidate.name === candidateName) {
    console.log("You have already voted for this candidate.");
    return;
  }

  const candidate = candidates.find(
    (candidate) => candidate.name === candidateName
  );
  if (candidate) {
    if (selectedCandidate) {
      const prevCandidate = candidates.find(
        (candidate) => candidate.name === selectedCandidate.name
      );
      prevCandidate.votes--;
      console.log(
        "Vote updated successfully for candidate:",
        selectedCandidate.name
      );
    }
    candidate.votes++;
    console.log("Vote submitted successfully for candidate:", candidateName);
    selectedCandidate = candidate;
    displayCandidates();
  } else {
    console.log("Candidate not found.");
  }
}

function deleteVote(candidateName) {
  if (!selectedCandidate) {
    console.log("No vote to delete.");
    return;
  }

  const candidate = candidates.find(
    (candidate) => candidate.name === candidateName
  );
  if (candidate) {
    if (selectedCandidate.name === candidateName) {
      selectedCandidate = null;
    }
    candidate.votes--;
    console.log("Vote deleted successfully for candidate:", candidateName);
    displayCandidates();
  } else {
    console.log("Candidate not found.");
  }
}
