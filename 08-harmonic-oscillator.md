---
title: "Chapter 8: The quantum harmonic oscillator" 
short_title: "Ch. 8: QHO"
numbering:
  enumerator: 8.%s
---

`````{important} Video: Quantum harmonic oscillator I
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/0b4b085334a44dbaa8936cd4f819ba0e1d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/2024-5/Lecture%20Slides/QM-8-I.pdf
:width: 100%
```
````
`````

We now turn our attention to arguably the most important system in all of quantum mechanics — the quantum harmonic oscillator. Here we will study the quantum mechanics of a particle whose force is of the form $F(x) = - kx$. That is, a restorative force proportional to the displacement from the origin. We know that in classical mechanics systems with such forces lead to simple harmonic motion. Our goal now is to understand the quantum mechanics of such systems.  

Why is this one of the most important systems to study? The first reason is that it provides an approximation to the behaviour of **almost all** potential wells, as we outline briefly as an aside. Second, you will see later in your degree that the quantum harmonic oscillator reappears in a huge range of situations, from describing light in quantum field theory, to describing phonons in condensed matter physics and far beyond. 

The method we will use to find the energy eigenstates of the quantum harmonic oscillator is also a very deep and powerful method. It is often called the **algebraic** approach, and provides a fascinating way of **turning one energy eigenstate into another**. The alternative approach is called the **analytical** approach, and relies on solving the TISE directly. Most textbooks choose one approach or the other (or present them both). Here, we will focus on the former, as it is also the approach which is widely used in other contexts. 

````{aside} *Approximation of an arbitrary potential well*
*Imagine a situation where a particle is acted on by a conservative force $F(x)$, with associated potential energy $V(x)$. Assume that this force pushes the particle back to a position $x_0$. An example is depicted below:*

```{image} ./Pictures/arbitrary-potential.svg
:name: arbitrary-well
:align: center
```

*What is the form of the potential when the particle is close to the bottom of the well?. We can **expand** the potential energy around the bottom, to obtain*
\begin{equation}\vph
V(x) \approx V_0 +  \frac{dV}{dx}\bigg|_{x_0}(x-x_0) + \frac{1}{2}  \frac{d^2V}{dx^2}\bigg|_{x_0}(x-x_0)^2
\end{equation}
*where $V_0 = V(x_0)$.*

*At $x = x_0$, the bottom of the well, the first derivative of the potential vanishes, $\frac{dV}{dx}\big|_{x_0} = 0$, since the bottom is, by definition, a **turning point**. Thus, to leading order, the potential will be approximately*
\begin{equation}\vph
V(x) \approx V_0 + \frac{1}{2} \frac{d^2V}{dx^2}\bigg|_{x_0}(x-x_0)^2.
\end{equation}
*We can finally make two simplifications without loss of generality: First, we can **redefine the zero of the energy scale**, so that $V_0 = V(x_0) = 0$. Second, we can change our co-ordinate so that the bottom of the well corresponds to $x_0 = 0$. With these two simplications, we arrive at*
\begin{equation}
V(x) \approx \frac{1}{2}\frac{d^2V}{dx^2}\bigg|_{0}x^2 
\end{equation}
*If we call $k = \frac{d^2V(x)}{dx^2}\bigg|_{0}$, then we arrive precisely at the potential energy $V(x) = \frac{1}{2}kx^2$ associated to the force $F(x) = -kx$, through $F(x) = -dV/dx$.* 

*This shows that the harmonic oscillator is the leading-order approximation to any potential well in the vicinity of the bottom of the well. It means that if the particle is not too far from $x_0 = 0$, then the force it experiences (and the potential energy it will have) will be essentially indistinguishable from the linear force of simple harmonic motion.* 

*This region of small $x$ is precisely the region that is explored classically by a particle with low energy. It is thus reasonable to assume that for low energies, all systems behave roughly like the harmonic oscillator, and that this is also true in quantum mechanics. Hence, by solving the quantum mechanics of a harmonic oscillator, we obtain an approximation to the quantum mechanics of any particle trapped in a potential well.*

*The only caveat to the above is when $d^2V/dx^2$ vanishes. In this case, we need to go to higher-order derivatives in order to find the leading-order approximation to the potential well, and the behaviour will not be well approximated by the harmonic oscillator. The infinite square well is precisely a potential of this kind — at the bottom of the well **all derivatives $d^nV/dx^n$ vanish**. However, this indicates that there is no force on the particle whatsoever, which is a very special situation. In general, it will be the case that $d^2 V/dx^2$ does not vanish, and that the leading-order behaviour is well approximated by the harmonic oscillator.*

````

## The harmonic oscillator potential
For the classical harmonic oscillator, the relation between the **spring-constant** $k$, the **mass** $M$ and **angular frequency** $\omega$ is $\omega = \sqrt{k/M}$. For this reason, it is customary to write $k = M \omega^2$ and take the definition of the harmonic oscillator potential to be
````{card}
```{math}
:label: e-QHO-potential
V(x) = \frac{1}{2} M \omega^2x^2.
```
````
This is depicted below in [](#harmonic-oscillator).

````{figure} ./Pictures/harmonic-oscillator.svg
:name: harmonic-oscillator
:width: 400px
:align: center

**Harmonic oscillator potential.** The potential energy of the harmonic oscillator.
````

## Generating energy eigenstates using the creation and annihilation operators

Our first goal, as always, is to determine the **energy eigenstates** of the quantum harmonic oscillator. In this chapter instead of going about this directly — by solving the TISE with the potential [](#e-QHO-potential) (which is in fact not very straightforward to do at all) — we are going to take a different approach. While at first sight this might seem strange, we will ultimately realise that this is a very powerful technique for finding the energy eigenstates. 

The approach we will take is to find a special **pair of operators** called the **creation** and **annihilation operators**. These remarkable operators **transform one energy eigenstate into another**. In fact, we will see that the creation operator generates the next energy level up, while the annihilation operator generates the next one down. In this way, once we have found just **one** energy eigenstate (by whatever means!) we can then use the creation and annihilation operators to **find them all**!

*What are these remarkable creation and annihilation operators?* To define them, we first need to define a **characteristic length scale** and a **characteristic momentum scale** for the harmonic oscillator. As you will show in [](#ex-length-mom-scales), the **physical** quantities of the harmonic oscillator — the **mass** $M$, the **angular frequency** $\omega$ (which specifies the scale of the **force** through the spring constant), along with $\hbar$ (the key quantum constant which has dimensions) — can be uniquely combined to specify a length $\ell$ and a momentum $q = \hbar/\ell$, given by
````{card}
```{math}
:label: e-ell-QHO
\ell &= \sqrt{\frac{\hbar}{M\omega}},& q &= \frac{\hbar}{\ell} = \sqrt{M\hbar \omega}.
```
````
With these defined, we can now define the annihilation and creation operators, which we denote by $\hat{a}$ and $\hat{a}^\dagger$ respectively, as
````{card}
```{math}
:label: e-creation-annihilation
\hat{a} &= \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} + i \frac{\hat{P}}{q}\right) = \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} + i \frac{\ell\hat{P}}{\hbar}\right)& &\text{annihilation op.}\\
\hat{a}^\dagger &= \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} - i \frac{\hat{P}}{q}\right) = \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} - i \frac{\ell\hat{P}}{\hbar}\right)& &\text{creation op.}
```
````
That is, the creation operator is a **dimensionless** combination of the position and momentum operators, with the momentum operator multipled by the imaginary number $i$ (and an overall normalisation factor of $1/\sqrt{2}$). 

*Why did we call the creation operator $\hat{a}^\dagger$?* Because it is indeed the **Hermitian conjugate operator to $\hat{a}$**: Recall that since position and momentum are **observable quantities** the operators $\hat{X}$ and $\hat{P}$ are **Hermitian**, satisfying $\hat{X}^\dagger = \hat{X}$ and $\hat{P}^\dagger = \hat{P}$. Thus, when we take the Hermitian conjugate of $\hat{a}$, the **only** change is to the sign of the imaginary number $i$, which is precisely the definition of $\hat{a}^\dagger$. 

*So, how do we see that these operators do as stated?* The claim is that if we act with the creation operator on an energy eigenstate $\ket{E_n}$ (of the quantum harmonic oscillator), then we will obtain (up to normalisation) **the energy eigenstate $\ket{E_{n+1}}$.** To be an energy eigenstate means that $\hat{H} \ket{E_n} = E_n \ket{E_n}$. Thus, the claim above, expressed mathematically, is that
```{math}
:label: e-H-adag
\hat{H} \left( \hat{a}^\dagger \ket{E_n}\right) = E_{n+1} \left(\hat{a}^\dagger\ket{E_n}\right),
```
since if this equation is satisfied, it means that $\left(\hat{a}^\dagger\ket{E_n}\right)$ is an energy eigenstate of $\hat{H}$, with eigenvalue $E_{n+1}$, i.e. it is the next energy level. 

In order to show [](#e-H-adag) holds, it is easiest to return to notion of the **commutator** that we introduced previously in [](#s-commutation). In particular, if we calculate $[\hat{H},\hat{a}^\dagger]$, and find that it is equal to the operator $\hat{b}$ (which we will come to below), then this would mean that $\hat{H}\hat{a}^\dagger - \hat{a}^\dagger \hat{H} = \hat{b}$, and so by re-arranging, $\hat{H}\hat{a}^\dagger = \hat{a}^\dagger \hat{H} + \hat{b}$. We can then substitute this into the left-hand side of [](#e-H-adag) to obtain
```{math}
:label: e-H-adag-1
\hat{H} \hat{a}^\dagger \ket{E_n} &= \left(\hat{a}^\dagger \hat{H} + \hat{b}\right)\ket{E_n},\\
&= \left(E_n \hat{a}^\dagger + \hat{b}\right)\ket{E_n}.
```
At first sight this might not look too helpful. However, at this stage it is useful to determine $\hat{b}$. In [](#ex-comm-H-adag) below, by using the explicit form of $\hat{a}^\dagger$ from [](#e-creation-annihilation), as well as the explicit form of the Hamiltonian operator, with $\hat{V} = \frac{1}{2} M \omega^2 \hat{X}^2$ from [](#e-QHO-potential), and the two commutators
```{math}
:label: e-comms-P2-X2
[\hat{P}^2,\hat{X}] &= -2i\hbar \hat{P},& [\hat{X}^2, \hat{P}] = 2i\hbar \hat{X},
```
both of which you prove as problems in problem classes, you will show that 
````{card}
```{math}
[\hat{H},\hat{a}^\dagger] = \hbar \omega \hat{a}^\dagger.
```
````
(i.e. $\hat{b} = \hbar \omega \hat{a}^\dagger$). Substituting this into [](#e-H-adag-1), we therefore see that
```{math}
:label: e-H-adag-2
\hat{H} \hat{a}^\dagger \ket{E_n} = (E_n + \hbar \omega) \hat{a}^\dagger \ket{E_n},
```
This means that $(\hat{a}^\dagger \ket{E_n})$ is an **energy eigenstate** of energy $(E_n + \hbar \omega)$ (up to normalisation). This is in fact the energy of the **next** energy level $E_{n+1}$. **We will not prove this here, but state it as a fact** (which has been shown to be true). One crucial point to note is that the **spacing between the energy levels of the harmonic oscillator is constant, and equal to $\hbar \omega$.** This is a special feature of the harmonic oscillator and for other potential wells, the spacing is not constant (e.g. as we saw for the infinite square well in [](#e-isw-energy-levels), the spacing **grows**). 

In a similar fashion, in [](#ex-comm-H-a) you will similarly show the commutation relation
````{card}
```{math}
:label: e-comm-H-a
[\hat{H},\hat{a}] = -\hbar \omega \hat{a},
```
````
between the Hamiltonian and the **annihilation operator**. From this, you [will also show that](#ex-H-a)
```{math}
:label: e-a-E-n
\hat{H}\hat{a}\ket{E_n} = (E_n - \hbar \omega)\hat{a}\ket{E_n}.
```
This shows that $(\hat{a}\ket{E_n})$ is an energy eigenstate of $\hat{H}$ with energy $(E_n - \hbar \omega) = E_{n-1}$. That is, the annihilation operator transforms an energy level into the **next lowest energy level** (up to normalisation). 

We thus have a procedure, starting from any given energy level $\ket{E_n}$, to create any other energy level, by either successively applying the creation operator (to **'climb up'** the energy levels) or by applying $\hat{a}$ (to **'climb down'** them). All we need is a way to find **one** eigenstate, and then we have everything we need. We will now see how we can obtain the **ground state** of the oscillator.

## The ground state of the harmonic oscillator

`````{important} Video: Quantum harmonic oscillator II
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/dfdf968d339f484c8d76aa5f354f57b91d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/2024-5/Lecture%20Slides/QM-8-II.pdf
:width: 100%
```
````
`````

You might have noticed something strange in the above — we appear to be able to apply the annihilation operator as many times as we like, and continually create new energy levels of progressively lower energy. However, we know that at some point we **must** hit the state of lowest energy — the ground state. We seem to thus have a problem with this approach.

A little thought shows that there is a way out of this problem: we pointed out a couple of times above that $\hat{a}\ket{E_n}$ isn't neccessarily **normalised**, and in fact we will see below that it isn't, and this is the key to escaping our problem. In particular, let us imagine that we have indeed found the ground state, which we will denote by $\ket{E_0}$. According to the above, $\hat{a}\ket{E_0}$ will be **proportional** to a state of energy $E_0 - \hbar \omega$. However, if the proportionality constant **vanishes**, then our sequence **terminates**. That is, if $\hat{a}\ket{E_0} = 0$, then we **don't** obtain a new state, and hence we can no longer climb down! 

Remarkably, this insight **also allows us to find the ground state $\ket{E_0}$**. More precisely, we can use it to find the ground state eigenfunction $u_0(x)$. *How do we do this?* Well, we know that eigenfunctions satisfy the same equation as eigenstates, except we have to use operators on wavefunctions instead. Therefore, $\hat{a}\ket{E_0} = 0$ is equivalent to
```{math}
\op{a} u_0(x) = 0,
```
where $\op{a} = \frac{1}{\sqrt{2}}(\op{X}/\ell + i\ell \op{P}/\hbar)$, as in [](#e-creation-annihilation). Substituting in $\op{P} = -i\hbar \frac{\partial}{\partial x}$ and $\op{X} = x$, and re-arranging, we arrive at a simple differential equation that must be satisfied by $u_0(x)$:
```{math}
\frac{\partial}{\partial x} u_0(x) = -\frac{x}{\ell^2} u_0(x).
```
It isn't too difficult to spot the solution to this: it is nothing but a Gaussian:
```{math}
\frac{\partial}{\partial x} \left(N_0 e^{-x^2/2\ell^2}\right) = - \frac{x}{\ell^2} N_0 e^{-x^2/2\ell^2},
```
where $N_0$ is a normalisation constant, that we will fix below. This shows that the **ground state of the harmonic oscillator is a gaussian wavefunction**, with standard deviation $\Delta x = \ell/\sqrt{2}$ (i.e. confirming that, indeed, $\ell$ is really a characteristic length scale of the harmonic oscillator). We can thus use [](#e-gaussian-wf) to fix the normalisation, and so the ground state wavefunction is
````{card}
```{math}
:label: e-gs-qho
u_0(x) = \sqrt{\frac{1}{\ell\sqrt{\pi}}} e^{-x^2/2\ell^2}.
```
````
As an [exercise](#ex-gs-E-QHO), by evaluating $\op{H}u_0(x)$, you will show that the energy of the ground state is
```{math}
E_0 = \frac{1}{2}\hbar \omega.
```
Before determining the rest of the energy eigenstates and eigenvalues, we will first introduce the **number operator** as this will allow us to take care of the normalisation of energy eigenstates. 

## The number operator
Having found the energy of the ground state, and given that we saw above that the energy spacing is $\hbar \omega$ (as we saw in [](#e-H-adag-2)), this means we now in fact know the energy of all of the energy levels, which is given by
````{card}
```{math}
:label: e-energy-levels-QHO
E_n &= \hbar \omega\left(n + \frac{1}{2}\right),& n&= 0,1,2,\ldots
```
````
Note, that whereas for the energy levels of the [infinite square well](07-infinite-square-well) we took $n$ to start at $n = 1$, for the harmonic oscillator we take $n$ to start at $n = 0$. This is **standard** and somewhat unfortunate, but has reason (which we will explain below).

We can use [](#e-energy-levels-QHO) to learn something very interesting about the product operator $\hat{a}^\dagger \hat{a}$. Using the definitions [](#e-creation-annihilation), we see that
```{math}
\hat{a}^\dagger \hat{a} &= \frac{1}{2}\left(\frac{\hat{X}}{\ell} - i\frac{\ell \hat{P}}{\hbar}\right)\left(\frac{\hat{X}}{\ell} + i\frac{\ell \hat{P}}{\hbar}\right), \\
&= \frac{1}{2}\left(\frac{\hat{X}^2}{\ell^2} + \frac{i}{\hbar}\left(\hat{X}\hat{P} - \hat{P}\hat{X}\right) + \frac{\ell^2\hat{P}^2}{\hbar^2}\right).
```
Using the definition of $\ell$ [](#e-ell-QHO), and the canonical commutation relation [](#e-canonical-comm), this can be further simplified to give
```{math}
\hat{a}^\dagger \hat{a} &= \frac{1}{2}\left(\frac{M\omega \hat{X}^2}{\hbar} + \frac{i}{\hbar} i\hbar + \frac{\hat{P}^2}{\hbar M \omega}\right),\\
&= \frac{1}{\hbar \omega}\left( \frac{\hat{P}^2}{2M} + \frac{1}{2} M \omega^2 \hat{X}^2 - \frac{1}{2} \hbar \omega\right).
```
The first two terms in the bracket are nothing but the kinetic energy operator and potential energy operator of the harmonic oscillator, and so together give the Hamiltonian $\hat{H}$. Thus, by re-arranging, we arrive at a special equation,
```{math}
\hat{H} = \hbar \omega \left(\hat{a}^\dagger \hat{a} + \frac{1}{2}\right),
```
which shows how we can **express the Hamiltonian in terms of the creation and annihilation operators**! Finally, comparing to [](#e-energy-levels-QHO), we see that we can give $\hat{a}^\dagger \hat{a}$ a **very nice interpretation**. Since $\hat{H}\ket{E_n} = E_n \ket{E_n}$ by definition, we must have
```{math}
:label: e-adag-a-En
\hat{a}^\dagger \hat{a} \ket{E_n} = n \ket{E_n}.
```
We therefore call $\hat{a}^\dagger \hat{a}$ the **number operator**, 
````{card}
```{math}
\hat{n} = \hat{a}^\dagger \hat{a},
```
```` 
such that $\ket{E_n}$ are **eigenstates**, with eigenvalue $n$ — the **quantum number** of the energy level. 

## Energy eigenstates of the harmonic oscillator

We can use the number operator to figure out how the creation and annihilation operators change the **norm** of a state. Consider that we have an energy eigenstate that is normalised, satisfying $\| \ket{E_n} \| = \sqrt{\inner{E_n}{E_n}} = 1$. Then, the norm of $\hat{a}\ket{E_n}$ will be
```{math}
\| \hat{a}\ket{E_n} \| &= \sqrt{(\bra{E_n}\hat{a}^\dagger)( \hat{a}\ket{E_n}}),\\
&= \sqrt{\bra{E_n}\hat{a}^\dagger\hat{a}\ket{E_n}},\\
&= \sqrt{n\inner{E_n}{E_n}},\\
&=\sqrt{n}
```
where to obtain the second line we used [](#e-adag-a-En), and pulled $n$ out the front. Thus, combining this with [](#e-a-E-n), we can conclude that the action of $\hat{a}$ on an energy eigenstate is
````{card}
```{math}
:label: e-a-on-En
\hat{a}\ket{E_n} = \sqrt{n} \ket{E_{n-1}}.
```
````
To find out how $\hat{a}^\dagger$ changes the norm of a state, we can apply $\hat{a}^\dagger$ to $(\hat{a}\ket{E_{n+1}})$. We see on the one hand that
```{math}
:label: e-ad-on-En-step-1
\hat{a}^\dagger \hat{a} \ket{E_{n+1}} = \hat{n}\ket{E_{n+1}} = (n+1)\ket{E_{n+1}}.
```
On the other hand, from [](#e-a-on-En), $\hat{a}\ket{E_{n+1}} = \sqrt{n+1}\ket{E_n}$, and so
```{math}
:label: e-ad-on-En-step-2
\hat{a}^\dagger \hat{a}\ket{E_{n+1}} = (\sqrt{n+1})\hat{a}^\dagger\ket{E_n}.
```
Equating the right-hand side of [](#e-ad-on-En-step-1) and [](#e-ad-on-En-step-2), and dividing by $\sqrt{n+1}$, we therefore see that
````{card}
```{math}
:label: e-ad-on-En
\hat{a}^\dagger\ket{E_n} = \sqrt{n+1} \ket{E_{n+1}}.
```
````

We finally have everything we need in order to determine the energy eigenstates of the harmonic oscillator! We can generate the $n^\mathrm{th}$ energy eigenstate by applying $\hat{a}^\dagger$ $n$ times to the ground state $\ket{E_0}$ (which we have already found), and dividing $\sqrt{n!}$ (where $n! = 1\times 2 \times \cdots \times n$),
````{card}
```{math}
\ket{E_n} = \frac{(\hat{a}^\dagger)^n}{\sqrt{n!}}\ket{E_0}.
```
````

 This way, we 'climb up' the energy eigenstates, and remain normalised as we go, successively generating all of them. 

What is more interesting and useful however is to obtain the **energy eigenfunctions** which we can also do in a similar manner: In fact, we have
````{card}
```{math}
u_n(x) = \frac{(\op{a}^\dagger)^n}{\sqrt{n!}}u_0(x).
```
````

````{important} Video: Quantum harmonic oscillator III
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/dfef2858fdd848d8af92eb69c750c31c1d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/2024-5/Lecture%20Slides/QM-8-III.pdf
:width: 100%
```
````

For example,
```{math}
:label: e-u1-qho
u_1(x) &= \frac{1}{\sqrt{2}}\left(\frac{\op{X}}{\ell} - i\frac{\ell \op{P}}{\hbar}\right)u_0(x),\\
&=\frac{1}{\sqrt{2}}\left(\frac{x}{\ell} - \ell \frac{\partial}{\partial x}\right)\sqrt{\frac{1}{\ell\sqrt{\pi}}} e^{-x^2/2\ell^2},\\
&=\frac{1}{\sqrt{2}}\left(\frac{x}{\ell} - \ell \left(-\frac{x}{\ell^2}\right)\right)\sqrt{\frac{1}{\ell\sqrt{\pi}}} e^{-x^2/2\ell^2},\\
&= \sqrt{\frac{2}{\ell\sqrt{\pi}}}\frac{x}{\ell} e^{-x^2/2\ell^2}.
```

Repeating this procedure, what we find in general is that all of the energy eigenfunctions have the form
````{card}
```{math}
\vph u_n(x) = N_n h_n(x/\ell) e^{-x^2/2\ell^2},
```
````
where $N_n$ is a **normalisation factor**, and $h_n(y)$ are functions known as **Hermite polynomials**. These are polynomials of degree $n$ (and this is finally why we start counting at $n = 0$ and not $n = 1$), which alternate between being **even** and **odd** (with $n$). The first few Hermite polynomials (as well as the associated normalised energy eigenfunction) are given in the following table: 

````{list-table} **Hermite polynomials and normalised energy eigenfunctions of the harmonic oscillator**. We give here the first 4 Hermite polynomials, and the corresponding normalised wavefunctions of the energy eigenstates of the quantum harmonic oscillator.
:header-rows: 1
:name: t-Hermite

* - $n$ 
  - Hermite polynomial $h_n(y)$ 
  - Energy eigenfunction $u_n(x)$ 
* - 0
  - 1
  - $\left(\frac{1}{\ell\sqrt{\pi}}\right)^{1/2} e^{-x^2/2\ell^2}$
* - 1
  - $2y$
  - $\left(\frac{2}{\ell\sqrt{\pi}}\right)^{1/2} \left(\frac{x}{\ell}\right)e^{-x^2/2\ell^2}$
* - 2
  - $4y^2 - 2$
  - $\left(\frac{2}{\ell\sqrt{\pi}}\right)^{1/2}\left(\frac{x^2}{\ell^2} - \frac{1}{2}\right)e^{-x^2/2\ell^2}$
* - 3
  - $8y^3 - 12y$ 
  - $2\left(\frac{1}{3\ell\sqrt{\pi}}\right)^{1/2} \frac{x}{\ell}\left(\frac{x^2}{\ell^2}-\frac{3}{2}\right)e^{-x^2/2\ell^2}$	
````

The energy eigenfunctions and corresponding probability densities of the first few energy eigenstates are plotted in [](#wf-ho) and [](#pd-ho) respectively.

````{figure} ./Pictures/eigenstates-ho.svg
:name: wf-ho
:width: 500px
:align: center

**Energy eigenfunctions of the harmonic oscillator.** The first six energy eigenfunctions $u_n(x)$ of the harmonic oscillator. The two markers on the $x$ axis show where **tunnelling** starts: the classically-allowed region is between the markers, where the total energy of the particle is more than the potential energy.
````

````{figure} ./Pictures/probs-ho.svg
:name: pd-ho
:width: 500px

**Probability densities of the eigenstates of the harmonic oscillator.** The probability densities for finding the particle at $x$ for the first six energy eigenstates of the harmonic oscillator. The markers again indicate where tunnelling starts.
````
It is insightful to compare to corresponding plots for the eigenfunctions and probability densities of the infinite square well potential from the previous chapter, as given in [](#f-isw-eigenfunctions) and [](#f-isw-pd). Even though the **functional form** is very different, graphically they are **remarkably similar**! This is a type of **universality**: low energy states generically have similar energy eigenfunctions (even though the energies in general will be very different). 

## Tunnelling and barrier penetration

There is one new and very important aspect of quantum mechanics that arises for the harmonic oscillator, which isn't present in the infinite square well potential, known as **tunnelling** or alternatively **barrier penetration**. 

Looking back at the potential energy $V(x)$ in [](#harmonic-oscillator), it is evident that as the particle moves away from the origin, its potential energy increases quadratically. We have now found the energy eigenstates, and their corresponding energy eigenfunctions, as listed in [](#t-Hermite) and depicted in [](#wf-ho) and [](#pd-ho).

Now, while the gaussian function decays rather rapidly, it is in fact non-zero **for all values of x**, and hence when a particle has a definite energy in the harmonic oscillator, there is a non-zero probability to find it in any finite region, no matter how far from the origin. 

This is however very strange, as above we just noted that the potential energy increases as we move away from the origin. This means that, no matter what finite energy the particle has (and all the energy levels have finite energy), it has a chance of being found far away **in a region where the potential energy is larger than the total energy $E_n$ of the particle!**

This is known as **tunnelling** or **barrier penetration**: a quantum particle manages to **enter a region** in which classically it does not have enough energy to enter! 

Remarkably, this isn't even a small effect! In [](#wf-ho) and [](#pd-ho) we have added vertical lines on the axis to denote the position where the potential energy $V(x) = E_n$. Beyond these points, classically the particle should not be found. As you can see, there is a significant probability to be found in the classically forbidden region, even in the ground state.

Although we won't study it in this course, tunnelling is interesting and important. Consider for example that we have **two potential wells**, separated by an energy barrier. Classically a particle can be trapped in one of them (for example, a planet can be bound in orbit around one star, even if there is a second star that it could equally be bound in orbit around). In quantum mechanics, **because a particle tunnels**, it is able to move between the two wells. This effect is extremely important, for example explaining $\alpha$ decay in particle physics, and being utilised in **semiconductor devices**. 

In this unit we won't go further into this fascinating effect, but just highlight its existence, and leave it for future courses to elaborate on the physical consequences of it. 

## Exercises

````{exercise}
:label: ex-length-mom-scales
1. The three dimensionful quantities for the quantum harmonic are the mass of the particle $M$, the angular frequency $\omega$ (which specifies the spring constant $k = M\omega^2$), and $\hbar$. Write down the dimensions of each of these quantities.

2. Find a combination of these quantities that has the dimension of length.  That is, let 
$$ \vph \ell = M^\alpha \omega^\beta \hbar^\gamma, $$
and find the exponents $\alpha$, $\beta$ and $\gamma$ that give $\ell$ the dimension of length. 
2. Find a combination of $M$, $\omega$ and $\hbar$ that have the dimension of momentum.  That is, let 
$$ \vph q = M^\mu \omega^\nu \hbar^\lambda, $$
and find the exponents $\mu$, $\nu$ and $\lambda$ that give $q$ the dimension of momentum. 
```{dropdown} Answers
1. $[M] = \mathsf{M}$, $[\omega] = \mathsf{T}^{-1}$, $[\hbar] = \mathsf{M}\mathsf{L}^{2} \mathsf{T}^{-1}$.
2. $\alpha = -\frac{1}{2}$, $\beta = -\frac{1}{2}$, $\gamma = \frac{1}{2}$. 
3. $\mu = \frac{1}{2}$, $\nu = \frac{1}{2}$, $\lambda = \frac{1}{2}$. 
```
````
````{exercise}
:label: ex-comm-H-adag
1. Show that for arbitrary operators $\hat{A}$, $\hat{B}$, $\hat{C}$ and $\hat{D}$ that
$$ [\hat{A} + \hat{B}, \hat{C} + \hat{D}] = [\hat{A},\hat{C}] + [\hat{A},\hat{D}] + [\hat{B},\hat{C}] + [\hat{B},\hat{D}].$$
2. Show that for arbitrary operators $\hat{A}$ and $\hat{B}$, and arbitrary complex constants $\alpha$ and $\beta$ that 
$$ [\alpha \hat{A}, \beta \hat{B}] = \alpha\beta [\hat{A},\hat{B}].$$
3. Using parts 1 and 2, and the explicit form of $\hat{H}$ and $\hat{a}^\dagger$, show that 
$$\vph[\hat{H}, \hat{a}^\dagger] = \frac{1}{2\sqrt{2}M\ell}[\hat{P}^2,\hat{X}] - \frac{i\ell}{2\sqrt{2}M\hbar}[\hat{P}^2,\hat{P}] +\frac{M\omega^2}{2\sqrt{2}\ell}[\hat{X}^2,\hat{X}] - \frac{iM\omega^2 \ell}{2\sqrt{2}\hbar}[\hat{X}^2,\hat{P}].$$
4. Use [](#e-comms-P2-X2), show that the other two commutators vanish, and use the definition of $\ell$ in [](#e-ell-QHO) to show that
$$ [\hat{H},\hat{a}^\dagger] = \hbar \omega \hat{a}^\dagger.$$
```{dropdown} Answers
1. n/a (show that).
2. n/a (show that).
3. n/a (show that).
4. n/a (show that).
```
````

````{exercise}
:label: ex-comm-H-a
1. Using parts 1 and 2 from [](#ex-comm-H-adag), show that
$$\vph[\hat{H}, \hat{a}] = \frac{1}{2\sqrt{2}M\ell}[\hat{P}^2,\hat{X}] + \frac{i\ell}{2\sqrt{2}M\hbar}[\hat{P}^2,\hat{P}] +\frac{M\omega^2}{2\sqrt{2}\ell}[\hat{X}^2,\hat{X}] + \frac{iM\omega^2 \ell}{2\sqrt{2}\hbar}[\hat{X}^2,\hat{P}].$$

2. Thus show that
$$ [\hat{H},\hat{a}] = -\hbar \omega \hat{a}.$$
```{dropdown} Answers
1. n/a (show that).
2. n/a (show that).
```
````
````{exercise}
:label: ex-H-a
1. Show that $\hat{H} \hat{a} = \hat{a}\hat{H} + [\hat{H}, \hat{a}]$. 
2. Use part 1, and [](#e-comm-H-a), to show that 
$$ \hat{H}\hat{a}\ket{E_n} = (E_n - \hbar \omega)\hat{a}\ket{E_n}.$$
3. Explain why this shows that $\hat{a}\ket{E_n}$ is (proportional to) an energy eigenstate of lower energy. 
```{dropdown} Answers
1. n/a (show that).
2. n/a (show that).
3. Part 2 shows that $\hat{a}\ket{E_n}$ is an eigenstate (up to normalisation) of $\hat{H}$, with eigenvalue $E = (E_n - \hbar \omega) < E_n$. 
```
````

````{exercise}
:label: ex-gs-E-QHO
1. Write down $\op{H}$ for the quantum harmonic oscillator.
2. Compute $\op{H}u_0(x)$, where the ground state wavefunction $u_0(x)$ is given in [](#e-gs-qho). 
3. Thus confirm that $E_0 = \frac{1}{2}\hbar \omega$. 

```{dropdown} Answers
1. $\op{H} = -\frac{\hbar^2}{2M}\frac{\partial^2}{\partial x^2} + \frac{1}{2}M\omega^2 x^2$
2. $\op{H}u_0(x) = \frac{1}{2}\hbar\omega u_0(x)$. 
3. Part 2 shows that $u_0(x)$ is an eigenfunction of $\op{H}$, with eigenvalue $E_0 = \frac{1}{2}\hbar\omega$. 
```
````

````{exercise}
:label: ex-u2
Starting from $u_1(x)$ as given in [](#e-u1-qho), use $\op{a}^\dagger$ to find explicitly the energy eigenfunction $u_2(x)$. 
```{dropdown} Answers
$$ u_2(x) = \sqrt{\frac{2}{\ell \sqrt{\pi}}}\left(\frac{x^2}{\ell^2} - \frac{1}{2}\right)e^{-x^2/2\ell^2}$$
```
````
