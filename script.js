function getUrlParameter(name) {
    name = name.replace(/\[/, '\\[').replace(/]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

window.onload = function() {
    const emojiParam = getUrlParameter('emoji');
    const titleParam = getUrlParameter('title') || 'Tab Tailor';
    if (emojiParam) {
        document.getElementById('emojiDisplay').textContent = emojiParam;
        updateEmoji(emojiParam);
    }
    document.getElementById('titleInput').value = titleParam;
    updateTitle(titleParam);
};

document.getElementById('emoji').addEventListener('click', function () {
    const emojiPicker = document.getElementById('emojiPicker');
    if (emojiPicker.style.display === 'block') {
        emojiPicker.style.display = 'none';
    } else {
        emojiPicker.style.display = 'block';
    }
});

document.addEventListener('click', function (event) {
    const emojiPicker = document.getElementById('emojiPicker');
    const emojiDisplay = document.getElementById('emoji');
    if (emojiPicker.style.display === 'block' && !emojiPicker.contains(event.target) && !emojiDisplay.contains(event.target)) {
        emojiPicker.style.display = 'none';
    }
});

document.getElementById('emojiPicker').addEventListener('click', function (event) {
    event.stopPropagation();
});

customElements.whenDefined('emoji-picker').then(() => {
    document.getElementById('emojiPicker').addEventListener('emoji-click', function (event) {
        const emoji = event.detail.unicode;
        document.getElementById('emojiDisplay').textContent = emoji;
        document.getElementById('emojiPicker').style.display = 'none';
        updateEmoji(emoji);
    });
});

document.getElementById('titleInput').addEventListener('input', function () {
    const title = document.getElementById('titleInput').value;
    updateTitle(title);
});

function updateEmoji(emoji) {
    if (!emoji) {
        return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.font = '64px serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const yOffset = 5; // Adjust this value as needed
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2 + yOffset);
    document.getElementById('favicon').href = canvas.toDataURL();
}

function updateTitle(title) {
    if (!title) {
        return;
    }
    document.title = title;
}