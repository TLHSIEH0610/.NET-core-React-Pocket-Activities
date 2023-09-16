namespace Domain
{
    public class Photo
    {
        public string Id { get; set; } //the publicId that get back from cloudinary
        public string Url { get; set; }
        public bool IsMain { get; set; } //if this is the user's image
    }
}