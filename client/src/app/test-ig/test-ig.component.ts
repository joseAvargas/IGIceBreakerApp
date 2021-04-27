import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstagramService } from '../_services/instagram.service';

@Component({
  selector: 'app-test-ig',
  templateUrl: './test-ig.component.html',
  styleUrls: ['./test-ig.component.css']
})
export class TestIgComponent implements OnInit {
  code: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  userMedia = [];
  response = [
    {
        "id": "18163129168103663",
        "caption": "The new king of Dino 🤴🏽",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/156345505_1137948660054563_8732795450935200054_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=qr7wfwclexYAX8QtOyq&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=ebcaac468878c1ef03d39be950a3b5d2&oe=60A26331",
        "permalink": "https://www.instagram.com/p/CL9GVEGA3mP/",
        "timestamp": "2021-03-03T11:19:47+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "18127064164180671",
        "caption": "Life as a puppy shouldn’t be so ruff",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/130144689_2817664108559280_3082866098121104766_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=ozTo0bEkA9YAX-iu5Iw&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=d97ae5ed281ea018d87fd2695bbcf530&oe=60A00DE7",
        "permalink": "https://www.instagram.com/p/CIm8MwoATF2/",
        "timestamp": "2020-12-10T07:13:48+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "17843851277399684",
        "caption": "Big Paw Energy 🐶 #MJ #KOBE",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/120663152_1122449281489984_4775771402956902833_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=ExZvuqfK4IAAX-xXs0u&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=8bfe23bfbe0620fab90406f987fcc794&oe=60A28DDF",
        "permalink": "https://www.instagram.com/p/CF2x-GUAaOP/",
        "timestamp": "2020-10-02T21:18:05+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "18159441490055800",
        "caption": "Cali living 🤙🏽",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/118499627_1212243055797444_1891419813452157376_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=9xq6aNFCBXQAX8yjA52&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=594693f98dffa6962e3420261196488f&oe=60A0A4FD",
        "permalink": "https://www.instagram.com/p/CEieshXgEEK/",
        "timestamp": "2020-08-31T03:33:27+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "17888967229632208",
        "caption": "Barracks Boys 🦍\n\n📸: @leah_nelson__",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/118592950_685740058952809_8240595733912207804_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=B3uJpWMtDRYAX-i7OuK&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=ec3cb93fa821e767bfb530c1364277de&oe=60A15B7B",
        "permalink": "https://www.instagram.com/p/CEf95TCg8dT/",
        "timestamp": "2020-08-30T04:08:21+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "17886245128670701",
        "caption": "Am I the only one who likes to wear black to the beach? 🤔",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/118172777_199440781517325_6429371492675596711_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=m7RUVAEMYzIAX8Xpu-6&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=5620cd29d4c38e00ec9728df159e0ca8&oe=60A1EBA7",
        "permalink": "https://www.instagram.com/p/CETCff5gldf/",
        "timestamp": "2020-08-25T03:38:24+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "17919101221447756",
        "caption": "🤙🏽",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/117652678_734828990421558_4536681118955683744_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=_aiXlO_2w_gAX-Q3hk9&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=ead0a45c7a00040a2beed2fb57cf2af2&oe=60A0130E",
        "permalink": "https://www.instagram.com/p/CD78I98gS8n/",
        "timestamp": "2020-08-16T04:20:21+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "18154965082045959",
        "caption": "Alive and well 🧿\n\n📸: @candyxoxo88",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-2.cdninstagram.com/v/t51.29350-15/117308728_2643802299203143_1168293060507452881_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=1RfdddZZXQ0AX9L3h2_&_nc_ht=scontent-lax3-2.cdninstagram.com&oh=03a95f0ab69ce60b7a1bc8bb61287ba7&oe=60A0F56C",
        "permalink": "https://www.instagram.com/p/CDsNiKagXgz/",
        "timestamp": "2020-08-10T01:44:30+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "17856811696988785",
        "caption": "RIP Big Rome 💔",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/101159477_632884717301159_5369489319091567356_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=cJL-lTRoFRgAX9LzEkq&_nc_ht=scontent-lax3-2.cdninstagram.com&oh=777d48959c2c3139125a01439e5709e4&oe=60A0BF8D",
        "permalink": "https://www.instagram.com/p/CA683VPAHUD/",
        "timestamp": "2020-06-02T05:33:16+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "18057882925103015",
        "caption": "I normally don’t write long paragraphs...\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\nand I’m not about to start now 🙃\nMomma I did it 🥳\n.\n📸: @reeebecky @pereyra_teresa19 \n#uci #softwareengineering #undergraduate #ics",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/64792438_687707551668243_974812961817344310_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=N-haWLNhk3wAX-7Qr9x&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=1a7985396b214b9812f4117ef8eb9823&oe=609FA6F1",
        "permalink": "https://www.instagram.com/p/Bytsryxg-rV/",
        "timestamp": "2019-06-15T02:42:14+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "18041196598115511",
        "caption": "🅱️🅱️ #X100PRE\n.\n.\n.\n.\n.\n#badbunny #x100pre #trap #losangeles",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/57568600_2008654699430272_4971746927902357804_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=xrW6TYDEf_EAX_vgUhE&_nc_ht=scontent-lax3-2.cdninstagram.com&oh=d3ee0b6b0cb1b8a9e12088fe2c1713de&oe=60A02477",
        "permalink": "https://www.instagram.com/p/BwlYUIKlhZ6/",
        "timestamp": "2019-04-23T04:07:32+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "18048612118045225",
        "caption": "shooting my shot.",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/54513550_303169637022385_6069640073436183144_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=ua15O3VmLSQAX8mTC70&_nc_ht=scontent-lax3-1.cdninstagram.com&oh=d9030d931812ec256e5471f450520020&oe=609F2FAE",
        "permalink": "https://www.instagram.com/p/BvaO-jsgpc9/",
        "timestamp": "2019-03-24T23:42:54+0000",
        "username": "___kingjayy___"
    },
    {
        "id": "17883762604132143",
        "caption": "Twenty-One! #HBDTank",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/23498540_143565976272846_5338866012190146560_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=VZ8CCGb3DksAX-EdBXj&_nc_ht=scontent-lax3-2.cdninstagram.com&oh=ea10fe6065570c8227d13649a656e9ac&oe=60A19F75",
        "permalink": "https://www.instagram.com/p/BbV_e71jDR3/",
        "timestamp": "2017-11-11T05:42:40+0000",
        "username": "___kingjayy___"
    }
]

  constructor(private route: ActivatedRoute, private igService: InstagramService) { 
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      params.code ?  this.code = params.code : this.code = null;
    });

    this.getUserMedia();
  }

  getUserMedia() {
    if (this.code != null){
      this.igService.GetUserMediaToken(this.code).subscribe(response => {
        this.getImages(response[1]['data']);
        // this.igService.SetUserToken('ig-token', response[0]);
      })
    }
    
  }

  getImages(data: any) {
    for(var element of data) {
      if(element['media_type'] === 'IMAGE')
        this.userMedia.push(element)
    }
  }

}
