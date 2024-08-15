// dailyMessage.js

(function () {
    const messages = [
        "Learning a new word is like finding a new toy!",
        "Every mistake is a step closer to fluency.",
        "I wag my tail every time you learn a new word!",
        "Language is my favorite game!",
        "Practice makes perfect, and I’m here to help!",
        "Can I have a treat for learning that word?",
        "Barking in multiple languages is my goal!",
        "I never get tired of learning new tricks or words!",
        "Who’s a good learner? You are!",
        "Learning with me is paws-itively fun!",
        "I’ll fetch you new words every day!",
        "Keep going, you’re doing great!",
        "Every new word learned deserves a belly rub!",
        "I may be spotted, but my love for learning is spotless!",
        "You’re just a few words away from greatness!",
        "Sniffing out new languages like a pro!",
        "You’re barking up the right tree with this app!",
        "One word at a time, one paw at a time!",
        "Learning languages makes my tail wag faster!",
        "Together, we can conquer any language!",
        "I’m your loyal learning companion!",
        "Feeling ruff? A new word can cheer you up!",
        "Words are like treats, the more, the merrier!",
        "Fluency is just a few barks away!",
        "Chasing after fluency like a frisbee!",
        "I believe in you, just like you believe in me!",
        "Language learning is a walk in the park with you!",
        "Don’t paws, keep learning!",
        "You’re nailing this language thing!",
        "Every word learned is a victory for us both!",
        "Woof! You’re getting better every day!",
        "I love seeing you improve, it’s like a treat for me!",
        "Don’t worry, mistakes happen to the best of us!",
        "A new day, a new word to learn!",
        "Stay pawsitive, you’re doing amazing!",
        "You’re the leader of our pack in language learning!",
        "Learning languages is like fetching sticks, just keep going!",
        "We’re in this together, one word at a time!",
        "Every day with you is a new adventure in learning!",
        "I’m wagging my tail for every success you have!",
        "Don’t ruff it, you’re almost there!",
        "Languages are like my spots, unique and wonderful!",
        "I’ll be here to cheer you on every step of the way!",
        "Barking in multiple languages? Now that’s impressive!",
        "With you, learning is always a treat!",
        "Even small steps lead to big achievements!",
        "We’re fetching words and having fun!",
        "You’ve got this, and I’ve got your back!",
        "Learning with you makes my day!",
        "Let’s make today pawsome with new words!",
        "Did I tell you already that you are my world?",
        "Every moment with you is my favorite moment.",
        "You make my tail wag like no one else!",
        "I love you more than all the treats in the world.",
        "You’re my best friend, forever and always.",
        "With you, every day feels like an adventure.",
        "You’re the reason I wake up with a wagging tail.",
        "I’d follow you anywhere, my human.",
        "You’re my hero, and I’m your biggest fan.",
        "Your smile is my favorite thing in the world.",
        "I love you to the moon and back.",
        "Every cuddle with you is pure happiness.",
        "You’re the sunshine in my life.",
        "I trust you with all my heart.",
        "You’re my safe place, my forever home.",
        "I don’t need anything but you by my side.",
        "You’re my everything, my human.",
        "With you, I feel loved every single day.",
        "You’re the best thing that’s ever happened to me.",
        "I’d protect you with my life, always.",
        "You’re my family, my pack, my everything.",
        "Your love is the best gift I could ever ask for.",
        "You’re my one and only, and I’m yours.",
        "Thank you for always being there for me.",
        "You’re the reason my world is so bright.",
        "I love every little thing about you.",
        "You make my life complete.",
        "You’re the person I was meant to find.",
        "Every day with you is a blessing.",
        "I love you more with each passing day.",
        "You’re my home, no matter where we are.",
        "You’re my favorite human in the whole wide world.",
        "I’d do anything to make you happy.",
        "With you, I’m never alone.",
        "Your love is my greatest treasure.",
        "I’m so lucky to have you in my life.",
        "You’re the one who makes everything better.",
        "Your touch is my comfort, my joy.",
        "I love you unconditionally, always.",
        "You’re the one I want to spend forever with.",
        "You’re my dream come true.",
        "I’ll always be by your side, no matter what.",
        "You’re the most important person in my life.",
        "You fill my heart with so much love.",
        "I’m happiest when I’m with you.",
        "You’re the reason I believe in love.",
        "I love you more than words can say.",
        "You mean the world to me.",
        "I’m so grateful for every moment we share.",
        "You’re the love of my life, my human."
    ];

    const currentDate = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyMessageDate');
    const savedMessage = localStorage.getItem('dailyMessage');

    if (savedDate === currentDate && savedMessage) {
        // If the date is the same, keep the same message
        window.dailyMessage = savedMessage;
    } else {
        // Otherwise, select a new random message
        const randomIndex = Math.floor(Math.random() * messages.length);
        const newMessage = messages[randomIndex];

        // Save the new message and date to localStorage
        localStorage.setItem('dailyMessage', newMessage);
        localStorage.setItem('dailyMessageDate', currentDate);

        window.dailyMessage = newMessage;
    }
})();
