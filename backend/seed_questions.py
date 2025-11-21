from app import create_app, db
from app.models.question import Question

QUESTIONS = [

    # ======================================================
    #                   10 QUESTIONS — ALADDIN
    # ======================================================

    {
        "story": "Aladdin",
        "difficulty": "easy",
        "prompt": "What magical object does Aladdin find in the cave?",
        "options": ["A lamp", "A jeweled crown", "A ring", "A sword"],
        "answer_index": 0,
        "explanation": "Aladdin finds a magic lamp containing the Genie."
    },
    {
        "story": "Aladdin",
        "difficulty": "easy",
        "prompt": "Who appears when Aladdin rubs the lamp?",
        "options": ["A Genie", "A Sultan", "A warrior", "A sorcerer"],
        "answer_index": 0,
        "explanation": "The Genie appears and grants wishes."
    },
    {
        "story": "Aladdin",
        "difficulty": "medium",
        "prompt": "Who tricks Aladdin’s wife into giving up the lamp?",
        "options": ["A disguised sorcerer", "A merchant", "A soldier", "A prince"],
        "answer_index": 0,
        "explanation": "The sorcerer disguises himself as a lamp peddler."
    },
    {
        "story": "Aladdin",
        "difficulty": "medium",
        "prompt": "What is Aladdin’s first major wish?",
        "options": ["Wealth", "A palace", "Freeing the Genie", "A flying carpet"],
        "answer_index": 1,
        "explanation": "He wishes for a magnificent palace."
    },
    {
        "story": "Aladdin",
        "difficulty": "medium",
        "prompt": "What object ALSO contains a genie in some versions of the tale?",
        "options": ["A ring", "A mirror", "A bracelet", "A necklace"],
        "answer_index": 0,
        "explanation": "The ring contains a lesser genie that helps Aladdin."
    },
    {
        "story": "Aladdin",
        "difficulty": "hard",
        "prompt": "Where does the sorcerer transport Aladdin’s palace?",
        "options": ["To Africa", "To Persia", "To India", "To Byzantium"],
        "answer_index": 0,
        "explanation": "The sorcerer moves the palace magically to Africa."
    },
    {
        "story": "Aladdin",
        "difficulty": "hard",
        "prompt": "How does Aladdin defeat the sorcerer?",
        "options": [
            "He uses the ring’s genie",
            "A magical duel",
            "A trick involving a jewel",
            "He traps him in the cave"
        ],
        "answer_index": 0,
        "explanation": "The ring’s genie helps Aladdin defeat the sorcerer."
    },
    {
        "story": "Aladdin",
        "difficulty": "hard",
        "prompt": "What symbolizes Aladdin’s humble origins?",
        "options": ["His mother’s weaving", "A broken sword", "His empty purse", "His wooden sandals"],
        "answer_index": 0,
        "explanation": "His mother works as a poor weaver."
    },
    {
        "story": "Aladdin",
        "difficulty": "easy",
        "prompt": "Whom does Aladdin marry?",
        "options": ["Princess Badroulbadour", "Princess Fatima", "Princess Leila", "Princess Noor"],
        "answer_index": 0,
        "explanation": "Aladdin wins the hand of Princess Badroulbadour."
    },
    {
        "story": "Aladdin",
        "difficulty": "medium",
        "prompt": "Why does the sorcerer want the lamp?",
        "options": [
            "To wield its great power",
            "To sell it",
            "To destroy it",
            "To free the Genie"
        ],
        "answer_index": 0,
        "explanation": "The sorcerer wants the lamp to control the Genie."
    },

    # ======================================================
    #               10 QUESTIONS — ALI BABA
    # ======================================================

    {
        "story": "Ali Baba",
        "difficulty": "easy",
        "prompt": "What phrase opens the thieves’ cave?",
        "options": ["Open sesame", "Reveal treasure", "Unlock cave", "Open sands"],
        "answer_index": 0,
        "explanation": "‘Open sesame’ opens the cave."
    },
    {
        "story": "Ali Baba",
        "difficulty": "easy",
        "prompt": "How does Ali Baba learn about the thieves’ cave?",
        "options": ["He overhears them", "A map", "His brother tells him", "A dream"],
        "answer_index": 0,
        "explanation": "He accidentally overhears the thieves."
    },
    {
        "story": "Ali Baba",
        "difficulty": "medium",
        "prompt": "Who is the true hero who repeatedly saves Ali Baba?",
        "options": ["Morgiana", "His son", "A merchant", "His wife"],
        "answer_index": 0,
        "explanation": "Morgiana outsmarts the thieves multiple times."
    },
    {
        "story": "Ali Baba",
        "difficulty": "medium",
        "prompt": "What happens to Cassim when he enters the cave?",
        "options": ["The thieves kill him", "He escapes", "He becomes rich", "He hides"],
        "answer_index": 0,
        "explanation": "Cassim is killed when he cannot remember the password."
    },
    {
        "story": "Ali Baba",
        "difficulty": "medium",
        "prompt": "How does the leader of the thieves infiltrate Ali Baba’s home?",
        "options": ["Hides in oil jars", "Disguises as merchant", "Bribes servants", "Uses a secret tunnel"],
        "answer_index": 0,
        "explanation": "He and his men hide inside large oil jars."
    },
    {
        "story": "Ali Baba",
        "difficulty": "hard",
        "prompt": "How does Morgiana defeat the thieves hiding in jars?",
        "options": ["Throws boiling oil", "Burns the jars", "Calls the guards", "Fills them with sand"],
        "answer_index": 0,
        "explanation": "She pours boiling oil into each jar."
    },
    {
        "story": "Ali Baba",
        "difficulty": "hard",
        "prompt": "How does Morgiana expose the thieves’ leader during dinner?",
        "options": ["Dagger dance", "A clever riddle", "Revealing his disguise", "Magic powder"],
        "answer_index": 0,
        "explanation": "She performs a dagger dance and kills him."
    },
    {
        "story": "Ali Baba",
        "difficulty": "easy",
        "prompt": "What reward does Morgiana receive at the end?",
        "options": ["Marriage and freedom", "Gold", "A home", "Nothing"],
        "answer_index": 0,
        "explanation": "Ali Baba rewards Morgiana by giving her freedom and marrying her to his son."
    },
    {
        "story": "Ali Baba",
        "difficulty": "medium",
        "prompt": "What lesson is central to Ali Baba’s tale?",
        "options": ["Greed leads to downfall", "Always seek adventure", "Magic is dangerous", "Trust only family"],
        "answer_index": 0,
        "explanation": "Cassim’s greed leads to his death."
    },
    {
        "story": "Ali Baba",
        "difficulty": "hard",
        "prompt": "What symbolizes the thieves’ power?",
        "options": ["Their code phrase", "Their horses", "Their swords", "Their map"],
        "answer_index": 0,
        "explanation": "The magical phrase grants access to great wealth."
    },

    # ======================================================
    #               10 QUESTIONS — SINBAD
    # ======================================================

    {
        "story": "Sinbad",
        "difficulty": "easy",
        "prompt": "What giant creature frequently appears in Sinbad’s voyages?",
        "options": ["Roc", "Kraken", "Dragon", "Leviathan"],
        "answer_index": 0,
        "explanation": "The Roc is a massive bird capable of carrying elephants."
    },
    {
        "story": "Sinbad",
        "difficulty": "easy",
        "prompt": "Why does Sinbad go on voyages?",
        "options": ["To seek fortune", "To find family", "To escape pirates", "To study magic"],
        "answer_index": 0,
        "explanation": "He seeks wealth and adventure."
    },
    {
        "story": "Sinbad",
        "difficulty": "medium",
        "prompt": "How does Sinbad escape the valley of diamonds?",
        "options": ["Tying himself to the Roc", "Digging tunnels", "Using ropes", "Hiding from snakes"],
        "answer_index": 0,
        "explanation": "He ties himself to the Roc’s leg to escape."
    },
    {
        "story": "Sinbad",
        "difficulty": "medium",
        "prompt": "What traps Sinbad and merchants in another voyage?",
        "options": ["Sweet resin", "Tar pits", "Sandstorms", "Whirlpools"],
        "answer_index": 0,
        "explanation": "Sticky resin used to trap diamonds also traps travelers."
    },
    {
        "story": "Sinbad",
        "difficulty": "medium",
        "prompt": "What monster does Sinbad’s crew mistake for an island?",
        "options": ["A giant fish", "A Kraken", "A dragon turtle", "A sea serpent"],
        "answer_index": 0,
        "explanation": "They camp on a giant fish that dives underwater."
    },
    {
        "story": "Sinbad",
        "difficulty": "hard",
        "prompt": "Which profession does Sinbad return to between voyages?",
        "options": ["Merchant", "Sailor", "Blacksmith", "Farmer"],
        "answer_index": 0,
        "explanation": "He resumes life as a merchant between journeys."
    },
    {
        "story": "Sinbad",
        "difficulty": "hard",
        "prompt": "Which creature hurls rocks at Sinbad’s ship?",
        "options": ["The Roc", "Cyclops", "Giant crab", "Sea demon"],
        "answer_index": 0,
        "explanation": "The Roc attacks after Sinbad kills its chick."
    },
    {
        "story": "Sinbad",
        "difficulty": "hard",
        "prompt": "In one voyage, who enslaves Sinbad?",
        "options": ["Black island king", "Pirates", "Merchants", "Bandits"],
        "answer_index": 0,
        "explanation": "He is temporarily enslaved by a king who tests his survival skills."
    },
    {
        "story": "Sinbad",
        "difficulty": "medium",
        "prompt": "What quality helps Sinbad survive his adventures?",
        "options": ["Cleverness", "Magic", "Strength", "Royal lineage"],
        "answer_index": 0,
        "explanation": "Sinbad uses intelligence and resourcefulness."
    },
    {
        "story": "Sinbad",
        "difficulty": "easy",
        "prompt": "How many voyages does Sinbad undertake?",
        "options": ["Seven", "Three", "Twelve", "Nine"],
        "answer_index": 0,
        "explanation": "The seven voyages form the structure of his stories."
    },

    # ======================================================
    #           10 QUESTIONS — SCHEHERAZADE (FRAME STORY)
    # ======================================================

    {
        "story": "Scheherazade",
        "difficulty": "easy",
        "prompt": "Why does Scheherazade tell stories to the king?",
        "options": ["To avoid execution", "To entertain him", "For wealth", "To teach him magic"],
        "answer_index": 0,
        "explanation": "She tells stories to survive another day."
    },
    {
        "story": "Scheherazade",
        "difficulty": "easy",
        "prompt": "Who is the king who marries and executes women?",
        "options": ["King Shahryar", "King Solomon", "King Harun", "King Bahram"],
        "answer_index": 0,
        "explanation": "Shahryar executes wives daily until Scheherazade changes him."
    },
    {
        "story": "Scheherazade",
        "difficulty": "medium",
        "prompt": "What storytelling technique helps Scheherazade survive?",
        "options": ["Cliffhangers", "Poems", "Songs", "Riddles"],
        "answer_index": 0,
        "explanation": "She ends each story at a suspenseful moment."
    },
    {
        "story": "Scheherazade",
        "difficulty": "medium",
        "prompt": "Who encourages Scheherazade to marry the king?",
        "options": ["Herself", "Her father", "Her sister", "The court advisor"],
        "answer_index": 0,
        "explanation": "She volunteers to change the king’s heart."
    },
    {
        "story": "Scheherazade",
        "difficulty": "hard",
        "prompt": "Who accompanies Scheherazade into the palace?",
        "options": ["Her sister Dunyazad", "Her mother", "Her maid", "A scholar"],
        "answer_index": 0,
        "explanation": "Dunyazad helps by asking for nightly stories."
    },
    {
        "story": "Scheherazade",
        "difficulty": "hard",
        "prompt": "How long do Scheherazade’s stories last?",
        "options": ["1001 nights", "500 nights", "365 nights", "40 nights"],
        "answer_index": 0,
        "explanation": "She tells stories for 1001 nights."
    },
    {
        "story": "Scheherazade",
        "difficulty": "medium",
        "prompt": "What is the purpose of the nested storytelling?",
        "options": ["To teach lessons", "To show wealth", "To confuse the king", "To practice magic"],
        "answer_index": 0,
        "explanation": "Each nested tale contains moral lessons."
    },
    {
        "story": "Scheherazade",
        "difficulty": "hard",
        "prompt": "What symbolizes Scheherazade’s wisdom?",
        "options": ["Her storytelling", "Her jewelry", "Her dress", "Her royal lineage"],
        "answer_index": 0,
        "explanation": "Her storytelling earns trust and compassion."
    },
    {
        "story": "Scheherazade",
        "difficulty": "easy",
        "prompt": "What change happens to the king over time?",
        "options": ["He becomes compassionate", "He becomes crueler", "He leaves the kingdom", "He loses power"],
        "answer_index": 0,
        "explanation": "Scheherazade’s stories heal his heart."
    },
    {
        "story": "Scheherazade",
        "difficulty": "medium",
        "prompt": "Why is Scheherazade considered a symbol of wisdom?",
        "options": ["She uses knowledge to save lives", "She is a warrior", "She uses magic", "She is royal"],
        "answer_index": 0,
        "explanation": "She stops the king’s cycle of violence with intelligence."
    }
]        "prompt": "How does Morgiana reveal the leader of the thieves during the feast?",
        "options": ["A sword attack", "A dance with a dagger", "A coded riddle", "A magic charm"],
        "answer_index": 1,
        "explanation": "Morgiana performs a dagger dance to expose and defeat the thief leader."
    },

    # --- SINBAD THE SAILOR ---
    {
        "story": "Sinbad",
        "difficulty": "easy",
        "prompt": "What gigantic bird appears in Sinbad's voyages?",
        "options": ["Roc", "Phoenix", "Thunderbird", "Gryphon"],
        "answer_index": 0,
        "explanation": "The Roc is a legendary giant bird capable of carrying elephants."
    },
    {
        "story": "Sinbad",
        "difficulty": "medium",
        "prompt": "Why does Sinbad tie himself to the Roc?",
        "options": ["To escape an island", "To reach treasure", "To attack pirates", "To find his crew"],
        "answer_index": 0,
        "explanation": "He ties himself to the Roc to escape the diamond valley island."
    },
    {
        "story": "Sinbad",
        "difficulty": "hard",
        "prompt": "In one voyage, what substance traps Sinbad and merchants in the valley?",
        "options": ["Sweet resin", "Volcanic ash", "Sandstorms", "Magnetic stones"],
        "answer_index": 0,
        "explanation": "Sweet-smelling resin attracts giant snakes and traps travelers."
    },

    # --- SCHEHERAZADE (FRAME STORY) ---
    {
        "story": "Scheherazade",
        "difficulty": "easy",
        "prompt": "Why does Scheherazade tell stories to the king?",
        "options": ["To avoid execution", "To entertain him", "To teach him magic", "To save her sister"],
        "answer_index": 0,
        "explanation": "She tells cliffhanger stories nightly to survive another day."
    },
    {
        "story": "Scheherazade",
        "difficulty": "medium",
        "prompt": "What storytelling technique does Scheherazade use to survive?",
        "options": ["Cliffhangers", "Poetry", "Songs", "Magic scrolls"],
        "answer_index": 0,
        "explanation": "She ends each night on a cliffhanger so the king spares her to hear the rest."
    },
    {
        "story": "Scheherazade",
        "difficulty": "hard",
        "prompt": "How long does Scheherazade continue telling stories?",
        "options": ["1001 nights", "500 nights", "3001 nights", "99 nights"],
        "answer_index": 0,
        "explanation": "Her stories span 1001 nights, earning her freedom."
    },

    # --- THE FISHERMAN AND THE JINNI ---
    {
        "story": "The Fisherman & the Jinni",
        "difficulty": "easy",
        "prompt": "What does the fisherman pull out of the sea?",
        "options": ["A sealed jar", "A golden fish", "A metal chest", "A magic ring"],
        "answer_index": 0,
        "explanation": "He finds a brass jar containing a furious jinni."
    },
    {
        "story": "The Fisherman & the Jinni",
        "difficulty": "medium",
        "prompt": "Why does the Jinni initially want to kill the fisherman?",
        "options": ["He was imprisoned too long", "He lost his power", "He hates humans", "He guards treasure"],
        "answer_index": 0,
        "explanation": "After long imprisonment, the Jinni vowed to kill whoever freed him."
    },
    {
        "story": "The Fisherman & the Jinni",
        "difficulty": "hard",
        "prompt": "How does the fisherman trick the Jinni back into the jar?",
        "options": [
            "By challenging him to prove he fit inside",
            "By using a magic rope",
            "By drawing a spell on the sand",
            "By threatening him with fire"
        ],
        "answer_index": 0,
        "explanation": "He pretends to doubt the Jinni's size-changing ability."
    },

    # --- THE PORTER AND THE THREE LADIES ---
    {
        "story": "The Porter & the Three Ladies",
        "difficulty": "medium",
        "prompt": "What condition do the ladies give the porter before entering their home?",
        "options": [
            "Do not ask personal questions",
            "Do not touch anything",
            "Speak only when spoken to",
            "Pay an entrance fee"
        ],
        "answer_index": 0,
        "explanation": "He is warned not to ask about their past or identities."
    },

    # --- THE EBONY HORSE ---
    {
        "story": "The Ebony Horse",
        "difficulty": "easy",
        "prompt": "What is special about the ebony horse?",
        "options": ["It can fly", "It grants wishes", "It talks", "It controls weather"],
        "answer_index": 0,
        "explanation": "The ebony horse is a flying mechanical creation."
    },

    # --- THE MERCHANT AND THE DEMON ---
    {
        "story": "The Merchant & the Demon",
        "difficulty": "medium",
        "prompt": "Why does the demon want to kill the merchant?",
        "options": [
            "The merchant accidentally killed the demon's son",
            "The merchant stole treasure",
            "The demon hates humans",
            "A broken oath"
        ],
        "answer_index": 0,
        "explanation": "A date pit thrown by the merchant accidentally killed the demon's son."
    },

    # --- HIDDEN GEMS FROM OTHER TALES ---
    {
        "story": "Various Tales",
        "difficulty": "medium",
        "prompt": "Which motif is most common across Arabian Nights stories?",
        "options": ["Magic objects", "Battles", "Villages", "Mythical horses"],
        "answer_index": 0,
        "explanation": "Most tales involve magical rings, lamps, carpets, jars, or amulets."
    },
    {
        "story": "Various Tales",
        "difficulty": "hard",
        "prompt": "What narrative structure links most stories in Arabian Nights?",
        "options": ["Framed storytelling", "Linear journey", "Epic poetry", "Religious instruction"],
        "answer_index": 0,
        "explanation": "Scheherazade narrates nested stories within stories, forming a frame structure."
    },
    {
        "story": "Various Tales",
        "difficulty": "easy",
        "prompt": "Who is the overall narrator of most Arabian Nights tales?",
        "options": ["Scheherazade", "Aladdin", "Sinbad", "Ali Baba"],
        "answer_index": 0,
        "explanation": "Scheherazade narrates stories to the king over many nights."
    }
]

def seed_questions():
    """Seed the database with quiz questions"""
    app = create_app()
    
    with app.app_context():
        # Clear existing questions
        Question.query.delete()
        
        # Add all questions
        for q_data in QUESTIONS:
            question = Question(**q_data)
            db.session.add(question)
        
        db.session.commit()
        print(f"✓ Seeded {len(QUESTIONS)} questions successfully!")

if __name__ == '__main__':
    seed_questions()
