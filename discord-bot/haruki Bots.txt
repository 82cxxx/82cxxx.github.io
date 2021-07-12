# 2021年7月13日0時20分

import discord
import os
import numpy
import math
from gensim.models import word2vec
import gensim
import MeCab
import urllib.parse
import random
from googletrans import Translator
from discord.ext import tasks
import requests
from pyzbar.pyzbar import decode
from PIL import Image

test = True

client = discord.Client()

drive = "a:"
lcolor=discord.Colour.from_rgb(250,205,250)

if test:
    drive = "q:"
    lcolor=discord.Colour.from_rgb(200,225,255)

botname = "Bots"





#
token = :YOUR TOKEN:
#





mec = MeCab.Tagger()
translator = Translator()

MecabWord = ['"',"#","$","%","&","'",")","=","~","|","@","`","+","*",";","<",">","?","/","\\","_"]
omikujilist1 = ["大々吉","大吉","中吉","小吉","吉","凶"]
jyan = [":fist:",":v:",":hand_splayed:"]
model = gensim.models.KeyedVectors.load_word2vec_format('word2vec_model/alldata.vec.txt', binary=False)
tl = "ja"

def mecab_list(text):
    tagger = mec
    tagger.parse('')
    node = tagger.parseToNode(text)
    word_class = []
    while node:
        word = node.surface
        wclass = node.feature.split(',')
        if wclass[0] != u'BOS/EOS':
            if wclass[6] == None:
                word_class.append((word,wclass[0],wclass[1],wclass[2],wclass[3],wclass[4],wclass[5],""))
            else:
                word_class.append((word,wclass[0],wclass[1],wclass[2],wclass[3],wclass[4],wclass[5],wclass[6]))
        node = node.next
    return word_class

def mecab_text(text):
    mecab_list_text = mecab_list(text)
    output_mecab_text = ""
    for meclist0 in mecab_list_text:
        for meclist1 in meclist0:
            output_mecab_text += meclist1 + "　"
        output_mecab_text += "\n"
    return output_mecab_text


def djan(ahand,bhand,username):
    hand = ahand+" vs "+bhand
    if ahand==jyan[0]:
        if bhand==jyan[0]:
            return [hand,"あいこ"]
        if bhand==jyan[1]:
            return [hand,username+"の勝ち"]
        if bhand==jyan[2]:
            return [hand,"botの勝ち"]
    if ahand==jyan[1]:
        if bhand==jyan[0]:
            return [hand,"botの勝ち"]
        if bhand==jyan[1]:
            return [hand,"あいこ"]
        if bhand==jyan[2]:
            return [hand,username+"の勝ち"]
    if ahand==jyan[2]:
        if bhand==jyan[0]:
            return [hand,username+"の勝ち"]
        if bhand==jyan[1]:
            return [hand,"botの勝ち"]
        if bhand==jyan[2]:
            return [hand,"あいこ"]
    return [hand,"error"]

def tda_to_txt(tda):
    txt = ""
    for tda0 in tda:
        for tda1 in tda0:
            txt = txt + str(tda1) + "　"
        txt = txt + "\n"
    return txt

def omikuji():
    omikujilist = omikujilist1
    return omikujilist[math.floor(numpy.random.rand()*len(omikujilist))]

def readqr(url):
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        with open("./tmp/qr.png", 'wb') as f:
            f.write(r.content)
        d = decode(Image.open("./tmp/qr.png"))
        return str(d[0].data.decode("utf-8"))

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')
    print(discord.__version__)
    print(discord.version_info)
    print('□■■■■■■□□□■■□□■■■■□□□□■■■■■□□□■■■■□□□□■■■■■□□□■■■■■■□□□')
    print('□■□□□□■■□□■■□■□□□■■□□■■□□□■□□■■□□□■■□□■□□□□■□□■□□□□■■□□')
    print('□■□□□□□■■□■■□■□□□□□□■■□□□□□□■■□□□□□■□□■□□□□■■□■□□□□□■■□')
    print('□■□□□□□□■□■■□■■■□□□□■□□□□□□□■□□□□□□■■□■□□□□■□□■□□□□□□■□')
    print('□■□□□□□□■□■■□□□■■■□□■□□□□□□□■□□□□□□■■□■■■■■□□□■□□□□□□■□')
    print('□■□□□□□□■□■■□□□□□■■□■□□□□□□□■□□□□□□■■□■□□□■□□□■□□□□□□■□')
    print('□■□□□□□■■□■■□□□□□□■□■■□□□□□□■■□□□□□■□□■□□□□■□□■□□□□□■■□')
    print('□■□□□□■■□□■■□■□□□■■□□■■□□□■□□■■□□□■■□□■□□□□■■□■□□□□■■□□')
    print('□■■■■■■□□□■□□□■■■■□□□□■■■■□□□□■■■■□□□□■□□□□□■□■■■■■■□□□')

@client.event
async def on_message(message):
    try:
        global tl
        mcs = message.content.startswith
        head = drive
        am = message.content
        am = am.replace('\\', '/')
        if not '>' in am:
            am += ">"
        s = am.split('>')
        sh = s[0].split('/')
        ph = sh[0]
        sc = s[1].split(' ')
        cm = s[0]+">"
        username = str(message.author)
        server = message.guild.id
        if message.author == client.user:
            return
        if ph=='ping':
            embed=discord.Embed(title="ping", description=drive+botname, color=lcolor)
            await message.channel.send(embed=embed)
        if ph=='test':
            embed=discord.Embed(title="test", description=":fist:", color=lcolor)
            await message.channel.send(embed=embed)
        if ph=="!qrcode" or ph=="!qr":
            filename = message.attachments[0]
            embed=discord.Embed(title="qrcode", description=readqr(filename), color=lcolor)
            await message.channel.send(embed=embed)
        if ph==drive:
            if sh[1]=="translate" or sh[1]=="trans":
                if sh[2]=='lang':
                    beforetl = tl
                    try:
                        trtext = s[1]
                        tl = trtext
                        try:
                            trans_test = translator.translate("hello", src = "en", dest = tl).text
                            embed=discord.Embed(title="translate", description="翻訳先の言語を"+tl+"にしました", color=lcolor)
                            await message.channel.send(embed=embed)
                        except ValueError:
                            embed=discord.Embed(title="translate", description="言語が見つかりませんでした", color=lcolor)
                            await message.channel.send(embed=embed)
                        tl = beforetl
                    except AttributeError:
                        trtext = ""
                elif sh[2]=='trans':
                    try:
                        trtext = s[1]
                    except AttributeError:
                        trtext = ""
                    if len(sh) <= 3:
                        sla=translator.detect(trtext).lang
                    elif sh[3]=="auto":
                        sla=translator.detect(trtext).lang
                    else:
                        sla=sh[3]
                    if len(sh) <= 4:
                        tla=tl
                    elif sh[4]=="auto":
                        tla=tl
                    else:
                        tla=sh[4]
                    try:
                        trans_text = translator.translate(trtext, src = sla, dest = tla).text
                    except ValueError:
                        embed=discord.Embed(title="translate", description="言語が見つかりませんでした", color=lcolor)
                        await message.channel.send(embed=embed)
                    embed=discord.Embed(title="translate", description=trans_text, color=lcolor)
                    await message.channel.send(embed=embed)
                else:
                    try:
                        trtext = s[1]
                    except AttributeError:
                        trtext = ""
                    sla=translator.detect(trtext).lang
                    tla=tl
                    trans_text = translator.translate(trtext, src = sla, dest = tla).text
                    await message.channel.send(cm+trans_text)
            if sh[1]=="janken" or sh[1]=="jan":
                if sh[2]=='start':
                    janres = jyan[math.floor(numpy.random.rand()*len(jyan))]
                    if s[1]=='グー' or s[1]=='g' or s[1]=='ぐー' or s[1]==jyan[0]:
                        janret = djan(jyan[0],janres,username)
                    if s[1]=='チョキ' or s[1]=='t' or s[1]=='ちょき' or s[1]==jyan[1]:
                        janret = djan(jyan[1],janres,username)
                    if s[1]=='パー' or s[1]=='p' or s[1]=='ぱー' or s[1]==jyan[2]:
                        janret = djan(jyan[2],janres,username)
                    embed=discord.Embed(title="janken", description=janret[0]+" : "+janret[1], color=lcolor)
                    await message.channel.send(embed=embed)
            if sh[1]=="omikuji" or sh[1]=="om":
                if sh[2]=='start':
                    embed=discord.Embed(title="omikuji", description=omikuji(), color=lcolor)
                    await message.channel.send(embed=embed)
            if sh[1]=="random" or sh[1]=="rand":
                try:
                    type = sh[2]
                except AttributeError:
                    type = "string"
                if type=="string":
                    out = random.choice(list(s[1]))
                if type=="array":
                    out = random.choice(s[1].split(","))
                embed=discord.Embed(title="janken", description=str(out), color=lcolor)
                await message.channel.send(embed=embed)
            if sh[1]=="word2vec" or sh[1]=="word":
                if sh[2]=='start':
                        if sh[3]=="計算" or sh[3]=="most_similar" or sh[3]=="0":
                            swordpos = sc[0]
                            swordneg = sc[1]
                            topnm = sc[2]
                            if topnm=="":
                                topnm="1"
                            if swordpos=="" or swordneg=="":
                                if swordpos=="" and swordneg!="":
                                    embed=discord.Embed(title="word2vec - most_similar", description="-"+str(swordneg.split(","))+","+str(topnm), color=lcolor)
                                    try:
                                        output=model.most_similar(negative=swordneg.split(","),topn=int(topnm))
                                        embed.add_field(name="result", value=tda_to_txt(output), inline=True)
                                        await message.channel.send(embed=embed)
                                    except KeyError:
                                        embed.add_field(name="error", value="単語が見つかりませんでした", inline=True)
                                        await message.channel.send(embed=embed)
                                if swordneg=="" and swordpos!="":
                                    embed=discord.Embed(title="word2vec - most_similar", description=str(swordpos.split(","))+","+str(topnm), color=lcolor)
                                    try: 
                                        output=model.most_similar(positive=swordpos.split(","),topn=int(topnm))
                                        embed.add_field(name="result", value=tda_to_txt(output), inline=True)
                                    except KeyError:
                                        embed.add_field(name="error", value="単語が見つかりませんでした", inline=True)
                                    await message.channel.send(embed=embed)
                            else:
                                embed=discord.Embed(title="word2vec - most_similar", description=str(swordpos.split(","))+"-"+str(swordneg.split(","))+","+str(topnm), color=lcolor)
                                try:
                                    output=model.most_similar(positive=swordpos.split(","),negative=swordneg.split(","),topn=int(topnm))
                                    print(output[0][0])
                                    embed.add_field(name="result", value=tda_to_txt(output), inline=True)
                                except KeyError:
                                    embed.add_field(name="result", value="単語が見つかりませんでした", inline=True)
                                await message.channel.send(embed=embed)
                        if sh[3]=="類似度の計算" or sh[3]=="similarity" or sh[3]=="1":
                            swordpos = sc[0]
                            swordneg = sc[1]
                            try:
                                output=model.similarity(w1=swordpos, w2=swordneg)
                                if output<0:
                                    output=output*-1
                                embed=discord.Embed(title="word2vec - similarity", description=swordpos+","+swordneg, color=lcolor)
                                embed.add_field(name="result", value=str(output), inline=True)
                                await message.channel.send(embed=embed)
                            except KeyError:
                                embed=discord.Embed(title="word2vec - similarity", description=swordpos+","+swordneg, color=lcolor)
                                embed.add_field(name="error", value="単語が見つかりませんでした", inline=True)
                                await message.channel.send(embed=embed)
                        if sh[3]=="ベクトルを検索" or sh[2]=="search_word_vector" or sh[3]=="2":
                            kensakuwor = sc[0]
                            try:
                                embed=discord.Embed(title="word2vec - search_word_vector", description=kensakuwor, color=lcolor)
                                embed.add_field(name="result", value=str(model[kensakuwor]), inline=True)
                                await message.channel.send(embed=embed)
                            except KeyError:
                                embed=discord.Embed(title="word2vec - search_word_vector", description=kensakuwor, color=lcolor)
                                embed.add_field(name="error", value="単語が見つかりませんでした", inline=True)
                                await message.channel.send(embed=embed)
            if sh[1]=="translateurl" or sh[1]=="transurl":
                if  sh[2]=="lang":
                    try:
                        tl = sc[0]
                        embed=discord.Embed(title="translateurl", description="翻訳先言語を"+tl+" に変更しました。", color=lcolor)
                        await message.channel.send(embed=embed)
                    except:
                        embed=discord.Embed(title="translateurl", description="言語の変更に失敗しました。現在の翻訳先言語は "+tl+" です。", color=lcolor)
                        await message.channel.send(embed=embed)
                if  sh[2]=="google":
                    try:
                        text = s[1]
                        sl = translator.detect(text).lang
                        embed=discord.Embed(title="translateurl - google", description=sl+" "+text+" から"+tl+" リンク",url="https://translate.google.com/?sl="+sl+"&tl="+tl+"&text="+urllib.parse.quote(text)+"&op=translate", color=lcolor)
                        await message.channel.send(embed=embed)
                    except AttributeError:
                        embed=discord.Embed(title="translateurl - google", description="Google Transのリンク",url="https://translate.google.com/", color=lcolor)
                        await message.channel.send(embed=embed)
                if  sh[2]=="deepl":
                    try:
                        text = s[1]
                        sl = translator.detect(text).lang
                        embed=discord.Embed(title="translateurl - deepl", description=sl+" "+text+" から"+tl+" リンク",url="https://www.deepl.com/translator#"+sl+"/tl"+tl+"/"+urllib.parse.quote(text), color=lcolor)
                        await message.channel.send(embed=embed)
                    except AttributeError:
                        embed=discord.Embed(title="translateurl - deepl", description="Deepl translatorのリンク",url="https://www.deepl.com/translator", color=lcolor)
                        await message.channel.send(embed=embed)
                if  sh[2]=="microsoft":
                    embed=discord.Embed(title="translateurl - microsoft", description="Microsoft Translatorのリンク",url="https://www.bing.com/translator", color=lcolor)
                    await message.channel.send(embed=embed)
            if sh[1]=="qrcode" or sh[1]=="qr":
                filename = message.attachments[0]
                embed=discord.Embed(title="qrcode", description=readqr(filename), color=lcolor)
                await message.channel.send(embed=embed)
        else:
            if message.content[:1] in MecabWord:
                mescon = message.content.replace(message.content[:1],"")
                try:
                    embed=discord.Embed(title="mecab", description=mecab_text(mescon), color=lcolor)
                    await message.channel.send(embed=embed)
                except:
                    temp = ""
    except Exception as e:
        embed=discord.Embed(title="error", description="何らかのエラーが発生しました", color=lcolor)
        await message.channel.send(embed=embed)
        print(e)

client.run(token)
