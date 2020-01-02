---
layout: page
title: History
permalink: /history/

---


These are some of the gaming projects I've participated in along the journey of learning to program. I have been using C# and Unity recently but I also have some experience with web development (HTML,Js,Css,Python) and mess around with Arduino's on occasion too.  

There are multiple other titles in progress as well as other projects going on in general so if you want to keep up to date with something follow me on social media somewhere.

<ul class="myposts">
{% for post in site.posts %}
    <li><a href="{{ post.url }}">{{ post.title}}</a>
    <span class="postDate">{{ post.date | date: "%b %-d, %Y" }}</span>
    </li>
{% endfor %}
</ul>
