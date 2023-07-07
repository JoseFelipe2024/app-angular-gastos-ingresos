#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Proyecto_final.Server.csproj", "."]
RUN dotnet restore "./Proyecto_final.Server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Proyecto_final.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Proyecto_final.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "Proyecto_final.Server.dll"]