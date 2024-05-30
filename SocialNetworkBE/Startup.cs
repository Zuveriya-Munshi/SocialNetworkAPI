using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace SocialNetworkBE
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Other app configurations

            // Use CORS middleware
            app.UseCors("AllowAllOrigins");

            // Other middleware configurations
        }
    }
}
