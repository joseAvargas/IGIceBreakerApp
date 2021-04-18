namespace API.Helpers
{
    public class InstagramSettings
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string RedirectUri { get; set; }
        public string AccessTokenEndpoint { get; set; }
        public string ShortLivedGrantType { get; set; }
        public string LongLivedGrantType { get; set; }
        public string LongLivedTokenEndpoint { get; set; }
    }
}