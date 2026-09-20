#!/usr/bin/env python3
"""Generate VLX 2027 newspaper-style social posts (HTML + caption)."""
import base64
import html
import os

DATELINE = "Hội An, Vietnam · 17th Edition · Established 2009"
FOOT = "VLX 2027 · 19–21 March 2027"
HASHTAGS = "#VLX2027 #VietnamLindyExchange #SwingDance #LindyHop #HoiAn"

# Inline the stylesheet (headless Chrome won't load a linked file:// stylesheet).
CSS = open(os.path.join("social", "templates", "newspaper.css"), encoding="utf-8").read()
CSS = CSS.replace("../../assets/fonts/chomsky.woff", "../../../assets/fonts/chomsky.woff")


def data_uri(p):
    mime = "image/png" if p.lower().endswith(".png") else "image/jpeg"
    with open(p, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


EMBLEM = data_uri("assets/brand/dancers.png")


def esc(s):
    return html.escape(s, quote=False)


def block(b):
    t = b["t"]
    if t == "cols":
        ps = "".join(f"<p>{p}</p>" for p in b["paras"])
        return f'<div class="cols">{ps}</div>'
    if t == "pull":
        return f'<blockquote class="pull">{b["text"]}</blockquote>'
    if t == "photo":
        return (
            f'<figure class="photo"><img src="{data_uri(b["src"])}" alt="" />'
            f'<figcaption>{b["caption"]}</figcaption></figure>'
        )
    if t == "box":
        rows = ""
        for r in b["rows"]:
            span = f'<span>{r["span"]}</span>' if r.get("span") else ""
            sub = f'<em>{r["sub"]}</em>' if r.get("sub") else ""
            rows += (
                f'<div class="box-row"><div class="box-date">{r["date"]}{span}</div>'
                f'<div class="box-desc"><strong>{r["title"]}</strong>{sub}</div></div>'
            )
        return f'<div class="box"><div class="box-head">{b["head"]}</div>{rows}</div>'
    if t == "list":
        items = "".join(f"<li>{i}</li>" for i in b["items"])
        return f'<div class="box"><div class="box-head">{b["head"]}</div><ul class="box-list">{items}</ul></div>'
    if t == "bignum":
        return f'<div class="bignum"><span>{b["num"]}</span><em>{b["label"]}</em></div>'
    if t == "byline":
        return f'<p class="byline">{b["text"]}</p>'
    if t == "hr":
        return '<div class="hr"></div>'
    raise ValueError(t)


def build_html(post):
    hl = "headline sm" if len(post["headline"]) > 26 else "headline"
    parts = [
        '<!doctype html><html><head><meta charset="utf-8" />',
        f'<style>{CSS}</style></head><body>',
        '<div class="page"><div class="frame">',
        f'<div class="emblem"><img src="{EMBLEM}" alt="" /></div>',
        '<div class="title">The VLX Times</div>',
        f'<div class="dateline">{DATELINE}</div>',
    ]
    if post.get("kicker"):
        parts.append(f'<div class="kicker">{post["kicker"]}</div>')
    parts.append(f'<h1 class="{hl}">{post["headline"]}</h1>')
    if post.get("deck"):
        parts.append(f'<p class="deck">{post["deck"]}</p>')
    parts.append('<div class="hr"></div>')
    for b in post["blocks"]:
        parts.append(block(b))
    parts.append(f'<div class="foot"><span>thevlx.net</span><span>{FOOT}</span></div>')
    parts.append('</div></div></body></html>')
    return "".join(parts)


def build_caption(post):
    return f'{post["caption"]}\n\n✨ Vietnam Lindy Exchange 2027 · 17th edition\n🗓️ 19–21 March 2027\n📍 Hội An, Vietnam\n🔗 thevlx.net (all details)\n\n{HASHTAGS}\n'


POSTS = [
    dict(
        slug="01-registration-opens-soon", kicker="Registration",
        headline="Registration opens soon",
        deck="Three windows open this October — here is when, and how to be ready to grab your pass.",
        blocks=[
            {"t": "cols", "paras": [
                "The Vietnam Lindy Exchange returns to Hội An for its seventeenth edition — three days and three nights of live bands, international DJs and dancing, from 19 to 21 March 2027.",
                "Registration opens in three windows this autumn. Group registration leads the way on Saturday 10 October, for teams of six to ten dancers; a maximum of ten groups will be accepted.",
                "Individual registration follows on 17 October, with the first fifty dancers taking the early-bird price. Regular registration opens on 24 October — or sooner, should the early bird sell out.",
                "Bands, DJs and the full weekend programme will be revealed over the coming weeks. Follow us — and keep this page bookmarked — so you don't miss a beat.",
            ]},
            {"t": "byline", "text": "Prices will be announced shortly · full instructions to follow"},
            {"t": "box", "head": "Registration · Three Windows", "rows": [
                {"date": "10 OCT", "span": "16:00 GMT+7", "title": "Group Registration", "sub": "Teams of 6–10 dancers · max 10 groups"},
                {"date": "17 OCT", "span": "16:00 GMT+7", "title": "Individual Registration", "sub": "First 50 dancers get the early-bird price"},
                {"date": "24 OCT", "span": "16:00 GMT+7", "title": "Regular Registration", "sub": "Or earlier, if early bird sells out"},
            ]},
        ],
        caption=(
            "🎟️ VLX 2027 registration opens soon!\n\n"
            "Get ready to grab your spot for a swingin' weekend in Hội An, Vietnam 💃✨\n\n"
            "🗓️ 10 Oct, 16:00 (GMT+7) — Group Registration (teams of 6–10 · max 10 groups)\n"
            "🗓️ 17 Oct, 16:00 (GMT+7) — Individual Registration (first 50 get the early-bird price)\n"
            "🗓️ 24 Oct, 16:00 (GMT+7) — Regular Registration (or earlier if early bird sells out)\n\n"
            "💸 Prices to be announced soon.\n\n"
            "What's waiting for you at VLX 2027?\n"
            "🎧 International DJs\n🎺 Live bands\n🌙 3 nights of dancing\n🍖 Gala BBQ buffet dinner\n"
            "☀️ Afternoon dance\n🏖️ Dancing by the beach & in the UNESCO town of Hội An\n\n"
            "Mark your calendars — full instructions are on the way. Stay tuned! 💃🕺"
        ),
    ),
    dict(
        slug="03-band-reveal-agsq", kicker="Bands",
        headline="From Japan: Asian Golden Swing Quartet",
        deck="Two nights of live music return to Hội An — meet the first band on the VLX 2027 bill.",
        blocks=[
            {"t": "photo", "src": "assets/live-bands/Band Asian-Golden-Swing-Quartet.jpg",
             "caption": "Asian Golden Swing Quartet, live on stage."},
            {"t": "pull", "text": "“We play swing jazz for swing dancers.”"},
            {"t": "cols", "paras": [
                "Loved by dancers across Asia, the Asian Golden Swing Quartet recently lit up Jeju Swing Camp 2025 — and now they are coming to Vietnam for the very first time.",
                "We are beyond excited to welcome them to the VLX stage this March. Get ready for two nights of swingin' live music, good vibes and endless dancing.",
                "Follow them at facebook.com/asiangoldenswingquartet — and keep an ear out for the next name on the bill.",
            ]},
        ],
        caption=(
            "🎺 Band reveal — VLX 2027 line-up!\n\n"
            "We've got plenty of new things coming this year, and one of the most exciting is our live music ✨\n\n"
            "🇯🇵 Asian Golden Swing Quartet (Japan)\n"
            "“We play swing jazz for swing dancers.” Loved by dancers across Asia — they recently lit up Jeju Swing Camp 2025, and now they're coming to Vietnam for the very first time! We're beyond excited to welcome them to the VLX stage this March 🇯🇵🎷\n"
            "👉 facebook.com/asiangoldenswingquartet\n\n"
            "Get ready for two nights of swingin' live music, good vibes and endless dancing! 💃🕺\n\n"
            "🗓️ Group: 10 Oct · 16:00 GMT+7   🗓️ Individual: 17 Oct · 16:00 GMT+7"
        ),
    ),
    dict(
        slug="04-website-live", kicker="The Website",
        headline="The new VLX website is live",
        deck="Dates, the programme and registration — all in one place.",
        blocks=[
            {"t": "cols", "paras": [
                "Our new home on the web has arrived. The dates, a first look at the programme, the bands as we announce them, and registration when each window opens — all under one roof.",
                "Bookmark thevlx.net and follow us here. Everything lands on the website first: the line-up, the venue, and full instructions for every kind of registration.",
                "It is early days yet, and we will keep filling the pages as the details are confirmed. Come back often.",
            ]},
            {"t": "byline", "text": "thevlx.net · Start reading"},
        ],
        caption=(
            "🌐 Our new website is live!\n\n"
            "Dates, the programme, the bands as we announce them and everything about registration — all in one place at thevlx.net.\n\n"
            "Bookmark it and follow us here; every detail lands on the website first. We'll keep updating it as things are confirmed, so check back often 💛\n\n"
            "🔗 thevlx.net"
        ),
    ),
    dict(
        slug="05-band-reveal-hat", kicker="Bands",
        headline="Our own: the HAT Jazz Band",
        deck="Bringing the heart of Da Nang's jazz scene to the VLX stage.",
        blocks=[
            {"t": "photo", "src": "assets/live-bands/Band-HATJAZZBAND.jpg",
             "caption": "The HAT Jazz Band, Da Nang."},
            {"t": "pull", "text": "“Simply the best jazz band in Da Nang.”"},
            {"t": "cols", "paras": [
                "Our very own local favourite, the HAT Jazz Band, brings the heart and soul of Da Nang's jazz scene to VLX.",
                "Their positivity and energy have made every VLX 'Dance by the Beach' unforgettable — and this year they light up our main evening dance, too.",
                "Follow them at facebook.com/hatjazzband, and watch this space for the rest of the line-up.",
            ]},
        ],
        caption=(
            "🎺 Band reveal — VLX 2027 line-up!\n\n"
            "🎷 HAT Jazz Band (Vietnam)\n"
            "Our very own local favourite — the HAT Jazz Band brings the heart and soul of Da Nang's jazz scene! Their positivity and energy have made every VLX 'Dance by the Beach' unforgettable, and this year they'll also light up our main evening dance 🇻🇳💫\n"
            "👉 facebook.com/hatjazzband\n\n"
            "Get ready for two nights of swingin' live music, good vibes and endless dancing! 💃🕺\n\n"
            "🗓️ Group: 10 Oct · 16:00 GMT+7   🗓️ Individual: 17 Oct · 16:00 GMT+7"
        ),
    ),
    dict(
        slug="07-two-days-to-go", kicker="Reminder",
        headline="Two days to go",
        deck="Group registration opens Saturday 10 October, 16:00 (GMT+7).",
        blocks=[
            {"t": "bignum", "num": "2", "label": "Days to go"},
            {"t": "list", "head": "Be ready before it opens", "items": [
                "Appoint your group leader",
                "Confirm your 6–10 dancers",
                "Prepare your payment method",
                "Stay close to your inbox",
            ]},
            {"t": "byline", "text": "Only 10 groups accepted · fastest fingers win"},
        ],
        caption=(
            "⏳ 2 days to go!\n\n"
            "Group registration for VLX 2027 opens this Saturday, 10 Oct at 16:00 GMT+7!\n\n"
            "Joining with friends? Make sure your group leader is ready, your team is confirmed (6–10 dancers) and your Wi-Fi is strong 😎 The form only asks a few basics — group leader's name, number of dancers, and everyone's full names. Super simple.\n\n"
            "Only 10 groups can join. Fastest fingers win — see you at the starting line 💃🕺✨"
        ),
    ),
    dict(
        slug="08-group-sold-out", kicker="Registration",
        headline="Group registration: sold out!",
        deck="Congratulations to all ten groups — you were seriously fast.",
        blocks=[
            {"t": "cols", "paras": [
                "A huge shout-out to every group leader — you were insanely quick this year, easily 220 bpm at least (iykyk).",
                "Group leaders: one more important step. Please make sure every member of your group submits their individual form so we can confirm your places smoothly.",
                "Not in a group? You still have your chance — individual registration opens on Saturday 17 October.",
            ]},
            {"t": "box", "head": "Next Up", "rows": [
                {"date": "17 OCT", "span": "16:00 GMT+7", "title": "Individual Registration", "sub": "First 50 dancers get the early-bird price"},
            ]},
        ],
        caption=(
            "🎉 Congratulations to all the groups who made it into VLX 2027!\n\n"
            "And a huge shout-out to all group leaders — you were insanely fast this year, easily 220 bpm at least (iykyk) 💛🔥\n\n"
            "📝 Group leaders: please make sure every member submits their individual registration form so we can confirm your spots smoothly.\n\n"
            "🌟 Not in a group? You still have a chance! Individual registration opens Saturday 17 Oct at 16:00 GMT+7 — the first 50 dancers get the early-bird price.\n\n"
            "Can't wait to swing out with y'all!"
        ),
    ),
    dict(
        slug="09-individual-tomorrow", kicker="Registration",
        headline="Individual registration opens tomorrow",
        deck="Set your alarm — Saturday 17 October, 16:00 (GMT+7).",
        blocks=[
            {"t": "box", "head": "Tomorrow", "rows": [
                {"date": "17 OCT", "span": "16:00 GMT+7", "title": "Individual Registration", "sub": "First 50 through the form get the early-bird price"},
            ]},
            {"t": "cols", "paras": [
                "The form goes live at thevlx.net. The first fifty dancers to submit take the early-bird price — counted strictly by the timestamp we receive.",
                "In the form, besides your basic details, you can ask us to connect you with rooms at Palm Garden Resort, our main venue. VLXers enjoy special rates — full details coming soon.",
                "Good luck, and we will see you on the dance floor.",
            ]},
        ],
        caption=(
            "🔥 INDIVIDUAL REGISTRATION — tomorrow!\n\n"
            "Set your alarms for 17 Oct, 16:00 GMT+7 ⏰ First 50 entries get early-bird pricing 💛\n"
            "👉 The form opens at thevlx.net\n\n"
            "✨ In the form, besides basic info, you can also choose to let us connect you with rooms at Palm Garden Resort, our main venue — VLXers enjoy special rates (details coming soon)."
        ),
    ),
    dict(
        slug="10-early-bird-payment", kicker="Payment",
        headline="Early birds: complete your payment",
        deck="Your place isn't secured until payment is confirmed.",
        blocks=[
            {"t": "cols", "paras": [
                "Once again, so many of you were insanely fast this year — easily 230 bpm this time. A quick reminder for our early-bird dancers:",
                "Please complete your payment within 24 hours of receiving our email with the payment details. We offer several payment methods — choose whatever suits you best.",
                "Your spot is officially secured only once payment is completed and you receive our confirmation email. Thank you for your patience while we process as fast as we can.",
                "Haven't received an early-bird payment email yet? Keep the faith — early bird only closes once all payments are completed on time. If someone doesn't pay within 24 hours, the next in line takes the spot. We haven't announced early bird sold out yet.",
            ]},
            {"t": "byline", "text": "Your place is confirmed only after payment"},
        ],
        caption=(
            "🔥 It's almost 24 hours since registration opened — and once again you were insanely fast, easily 230 BPM this time 😎\n\n"
            "A quick reminder for our early-bird dancers:\n\n"
            "💛 Please complete payment within 24 hours of receiving our email with payment details. We offer several payment methods — pick what works best for you!\n\n"
            "✨ Your spot is secured only once payment is completed and you receive our confirmation email (thank you for your patience — we're processing as fast as we can).\n\n"
            "👀 Haven't received an early-bird payment email yet? You still have a chance — early bird only closes once all payments are done on time, and unpaid spots go to the next in line. We haven't announced early bird sold out yet 😉\n\n"
            "Thank you for all the love — VLX 2027 is already swinging because of you 💛🌿"
        ),
    ),
    dict(
        slug="11-early-bird-sold-out", kicker="Registration",
        headline="Early bird: sold out!",
        deck="Thank you, fast feet — and there is still a way in.",
        blocks=[
            {"t": "cols", "paras": [
                "Huge congratulations to all the early birds, and thank you for completing your payments on time.",
                "Registration is still open! Head to thevlx.net for all the details and sign up while places remain.",
                "After you submit the form, keep an eye on your inbox. We will send payment instructions, and your spot is confirmed once payment is received. We can't wait to reveal more very soon.",
            ]},
            {"t": "box", "head": "Still Open", "rows": [
                {"date": "NOW", "span": "thevlx.net", "title": "Regular Registration", "sub": "Open to everyone, subject to availability"},
            ]},
        ],
        caption=(
            "🍂 EARLY BIRD SOLD OUT — regular registration still flies high!\n\n"
            "Yayyy, huge congrats to all the early birds and fast feet — and thank you for paying on time 🙌🏼\n\n"
            "Registrations are still open! Head to thevlx.net for all the details and sign up while spots last.\n\n"
            "After you submit the form, please check your inbox within 48 hours — we'll send payment instructions. Your spot is confirmed only once your payment is complete and you've received our confirmation email (thank you for your patience — we're processing as fast as we can!).\n\n"
            "Thank you again for all the love. VLX 2027 is going to be a beautiful one — more reveals very soon 💛"
        ),
    ),
]


def main():
    for p in POSTS:
        d = os.path.join("social", "posts", p["slug"])
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "post.html"), "w", encoding="utf-8") as f:
            f.write(build_html(p))
        with open(os.path.join(d, "caption.txt"), "w", encoding="utf-8") as f:
            f.write(build_caption(p))
        print("wrote", d)


if __name__ == "__main__":
    main()
