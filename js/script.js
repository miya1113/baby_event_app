document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("eventForm");
  const result = document.getElementById("result");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const gender = document.querySelector('input[name="gender"]:checked').value;
      const birthday = document.getElementById("birthday").value;

      if (!birthday) {
        alert("生年月日を入力してください。");
        return;
      }

      localStorage.setItem("babyGender", gender);
      localStorage.setItem("babyBirthday", birthday);

      window.location.href = "result.html";
    });
  }

  if (result) {
    const gender = localStorage.getItem("babyGender");
    const birthdayValue = localStorage.getItem("babyBirthday");

    if (!gender || !birthdayValue) {
      result.innerHTML = `<p class="message">データがありません。最初の画面から入力してください。</p>`;
      return;
    }

    const birthday = new Date(birthdayValue);

    const events = {
      "お七夜": addDays(birthday, 7),
      "お宮参り": addDays(birthday, 30),
      "100日祝い（お食い初め）": addDays(birthday, 100),
      "ハーフバースデー": addDays(birthday, 182),
      "1歳の誕生日": addDays(birthday, 365)
    };

    const details = {
      "お七夜": "生後7日目に赤ちゃんの名前をお披露目する日。",
      "お宮参り": "生後30日前後に神社へ参拝し、健やかな成長を祈る行事。",
      "100日祝い（お食い初め）": "一生食べ物に困らないように願う儀式。",
      "ハーフバースデー": "生後6ヶ月のお祝い。写真撮影が人気。",
      "1歳の誕生日": "一升餅や選び取りなど、地域によっていろいろなお祝いがある。",
      "初節句（男の子）": "こどもの日。兜や鯉のぼりを飾る。",
      "初節句（女の子）": "ひな祭り。ひな人形を飾って成長を願う日。"
    };

    if (gender === "boy") {
      events["初節句（男の子）"] = getFirstBoysFestival(birthday);
    } else {
      events["初節句（女の子）"] = getFirstGirlsFestival(birthday);
    }

    result.innerHTML = "";

    for (const [eventName, eventDate] of Object.entries(events)) {
      const detail = details[eventName] || "";

      result.innerHTML += `
        <section class="event-card">
          <h2>${eventName}</h2>
          <p class="event-date">日付：${formatDate(eventDate)}</p>
          <p class="event-detail">${detail}</p>
        </section>
      `;
    }
  }
});

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function getFirstBoysFestival(birthday) {
  const year = birthday.getFullYear();
  const festivalThisYear = new Date(year, 4, 5); // 5月5日

  if (birthday <= festivalThisYear) {
    return festivalThisYear;
  }
  return new Date(year + 1, 4, 5);
}

function getFirstGirlsFestival(birthday) {
  const year = birthday.getFullYear();
  const festivalThisYear = new Date(year, 2, 3); // 3月3日

  if (birthday <= festivalThisYear) {
    return festivalThisYear;
  }
  return new Date(year + 1, 2, 3);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
}
