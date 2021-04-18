using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    
    public class IGController : BaseApiController
    {
        static readonly HttpClient client = new HttpClient();
       
        private string _clientId;
        private string _clientSecret;
        private string _redirectUri;
        private string _access_token_enpoint;
        private string _short_lived_grant_type;
        private string _long_lived_grant_type;
        private string _long_lived_token_endpoint;

        public IGController(IOptions<InstagramSettings> config)
        {
            _clientId = config.Value.ClientId;
            _clientSecret = config.Value.ClientSecret;
            _redirectUri = config.Value.RedirectUri;
            _access_token_enpoint = config.Value.AccessTokenEndpoint;
            _short_lived_grant_type = config.Value.ShortLivedGrantType;
            _long_lived_grant_type = config.Value.LongLivedGrantType;
            _long_lived_token_endpoint = config.Value.LongLivedTokenEndpoint;
        }

        [HttpPost("ig-long-lived-token/{code}")]
        public async Task<JsonElement> GetIgUserToken(string code)
        {
            if(client.BaseAddress == null)
                client.BaseAddress = new Uri(_access_token_enpoint);

            string _ContentType = "application/x-www-form-urlencoded";
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_ContentType));
            var _UserAgent = "d-fens HttpClient";
            client.DefaultRequestHeaders.Add("User-Agent", _UserAgent);

            var postBodyContent = this.GenerateShortLivedTokenParams(code);

            var postReq = new HttpRequestMessage(HttpMethod.Post, _access_token_enpoint) { Content = new FormUrlEncodedContent(postBodyContent) };
            var postRes = await client.SendAsync(postReq);
            var jsonString = postRes.Content.ReadAsStringAsync().Result;
            var jsonObject = JsonDocument.Parse(jsonString).RootElement;
            var access_token = jsonObject.GetProperty("access_token").ToString();

            var longLivedTokenObj = await this.GetIgUserLongLivedToken(access_token);
            var longLivedToken = longLivedTokenObj.GetProperty("access_token").ToString();

            var userMediaObj = await this.GetIgUserMedia(longLivedToken);


            return userMediaObj;
        }

        public async Task<JsonElement> GetIgUserMedia(string accessToken)
        {
            var url = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=" + accessToken;

            var postReq = new HttpRequestMessage(HttpMethod.Get, url);
            var postRes = await client.SendAsync(postReq);
            
            var jsonString = postRes.Content.ReadAsStringAsync().Result;
            var jsonObject = JsonDocument.Parse(jsonString).RootElement;

            return jsonObject;
        }
        public async Task<JsonElement> GetIgUserLongLivedToken(string access_token)
        {
            if(client.BaseAddress == null)
                client.BaseAddress = new Uri(_long_lived_token_endpoint);

            var _UserAgent = "d-fens HttpClient";
            client.DefaultRequestHeaders.Add("User-Agent", _UserAgent);

            var getBodyContent = this.GenerateLongLivedTokenParams(access_token);

            var url = this.GenerateLongLivedTokenUrl(access_token);

            var getReq = new HttpRequestMessage(HttpMethod.Get, url) { };
            var getRes = await client.SendAsync(getReq);
            var jsonString = getRes.Content.ReadAsStringAsync().Result;
            var jsonObject = JsonDocument.Parse(jsonString).RootElement;

            return jsonObject;
        }

        private List<KeyValuePair<string, string>> GenerateShortLivedTokenParams(string code)
        {
            var bodyContent = new List<KeyValuePair<string, string>>();
            bodyContent.Add(new KeyValuePair<string, string>("client_id", _clientId));
            bodyContent.Add(new KeyValuePair<string, string>("client_secret", _clientSecret));
            bodyContent.Add(new KeyValuePair<string, string>("grant_type", _short_lived_grant_type));
            bodyContent.Add(new KeyValuePair<string, string>("redirect_uri", _redirectUri));
            bodyContent.Add(new KeyValuePair<string, string>("code", code));

            return bodyContent;
        }

        private List<KeyValuePair<string,string>> GenerateLongLivedTokenParams(string short_lived_token)
        {
            var bodyContent = new List<KeyValuePair<string, string>>();
            bodyContent.Add(new KeyValuePair<string, string>("grant_type", _long_lived_grant_type));
            bodyContent.Add(new KeyValuePair<string, string>("client_secret", _clientSecret));
            bodyContent.Add(new KeyValuePair<string, string>("access_token", short_lived_token));

            return bodyContent;
        }
        private string GenerateLongLivedTokenUrl(string short_lived_token)
        {
            var url = _long_lived_token_endpoint + "?grant_type=" + _long_lived_grant_type 
                + "&client_secret=" + _clientSecret
                +"&access_token=" + short_lived_token;
            return url;
        }
    }
}