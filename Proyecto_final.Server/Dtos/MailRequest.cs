using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;

namespace Proyecto_final.Server.Dtos
{
    public class MailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public MailRequestFile Attachment { get; set; }
    }

    public class MailRequestFile
    {
        public string FileName { get; set; }
        public byte[] File { get; set; } 
        public string ContentType { get; set; } 
    }
}
